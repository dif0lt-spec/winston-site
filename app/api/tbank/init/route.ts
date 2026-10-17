import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, orderId } = body;

    if (!amount || !orderId) {
      return NextResponse.json({ error: "Missing amount or orderId" }, { status: 400 });
    }

    const terminalKey = process.env.TBANK_TERMINAL_KEY!;
    const password = process.env.TBANK_PASSWORD!;
    const apiUrl = process.env.TBANK_API_URL!;

    // Формируем данные для чека
    const receipt = {
      Email: "customer@example.com", // В реальности нужно брать email пользователя
      Taxation: "usn_income",
      Items: [
        {
          Name: "Подписка Winston Visual",
          Price: amount * 100, // Т-Банк принимает копейки
          Quantity: 1,
          Amount: amount * 100,
          Tax: "none",
        },
      ],
    };

    const payload = {
      TerminalKey: terminalKey,
      Amount: amount * 100,
      OrderId: orderId,
      Description: "Оплата подписки Winston Visual",
      Receipt: receipt,
      SuccessURL: "https://winston-visual.ru/success", // Куда вернуть после успеха
      FailURL: "https://winston-visual.ru/fail",       // Куда вернуть при ошибке
    };

    // Генерируем токен (подпись) по правилам Т-Банка
    const tokenData = {
      ...payload,
      Password: password,
    };
    
    const sortedKeys = Object.keys(tokenData).sort();
    let concatenated = "";
    for (const key of sortedKeys) {
      if (key !== "Receipt" && key !== "Data") {
        concatenated += String(tokenData[key as keyof typeof tokenData]);
      }
    }
    
    const token = crypto.createHash("sha256").update(concatenated).digest("hex");

    // Отправляем запрос в Т-Банк
    const response = await fetch(`${apiUrl}/Init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, Token: token }),
    });

    const data = await response.json();

    if (data.Success) {
      return NextResponse.json({ paymentUrl: data.PaymentURL });
    } else {
      return NextResponse.json({ error: data.Message }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}