"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("account");

  const menuItems = [
    { id: "account", label: "Аккаунт", icon: "👤" },
    { id: "balance", label: "Баланс", icon: "💳" },
    { id: "shop", label: "Магазин", icon: "🛒" },
    { id: "download", label: "Скачать клиент", icon: "⬇️" },
    { id: "support", label: "Поддержка", icon: "❓" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans">
      {/* Навигация */}
      <nav className="border-b border-white/5 bg-[#0a0a0f]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" unoptimized />
            </div>
            <span className="font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">
              Winston Visual
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-sm text-gray-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Главная</Link>
              <Link href="/#pricing" className="hover:text-white transition-colors">Тарифы</Link>
            </div>
            <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">W</div>
              <span className="text-sm font-medium">WinstonBlue6012</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row gap-10">
        
        {/* Боковое меню */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-lg font-bold mb-6 text-white">Мой профиль</h2>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === item.id 
                  ? "bg-purple-600/20 text-purple-300 border-l-4 border-purple-500" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Контентная часть */}
        <main className="flex-1 min-h-[500px]">
          
          {/* Хлебные крошки */}
          <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Главная</Link>
            <span>/</span>
            <span className="text-white">Мой профиль</span>
            <span>/</span>
            <span className="text-white capitalize">{menuItems.find(i => i.id === activeTab)?.label}</span>
          </div>

          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            
            {/* Вкладка: АККАУНТ */}
            {activeTab === "account" && (
              <>
                <h1 className="text-3xl font-bold mb-10">
                  Привет, <span className="text-green-400">WinstonBlue6012</span>
                </h1>

                <h2 className="text-xl font-semibold mb-6">Информация о профиле</h2>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">Дата регистрации</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5">17.10.2026</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">ID</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5 font-mono">385834</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">Ваша роль</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5 flex justify-end items-center gap-2">
                      <span className="text-purple-400">👤</span> Пользователь
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">Email</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5">leloushbritski@gmail.com</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">Пароль</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5 flex justify-end items-center gap-3">
                      <span className="font-mono text-gray-500">**********</span>
                      <button className="text-gray-400 hover:text-white">✏️</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5">
                    <div className="p-4 text-gray-400 text-sm">HWID</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5 text-gray-500">Не привязан</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="p-4 text-gray-400 text-sm">Telegram</div>
                    <div className="p-4 text-right md:col-span-2 border-l border-white/5 flex justify-end">
                      <button className="bg-[#229ED9] hover:bg-[#1E8BC3] text-white text-xs font-bold py-1.5 px-4 rounded-full flex items-center gap-1.5 transition-colors">
                        <span>✈️</span> Привязать
                      </button>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold mb-6">Активация ключа</h2>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-4">Введите ключ активации</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="text" 
                      placeholder="XXXX-XXXX-XXXX-XXXX" 
                      className="flex-1 bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white font-mono focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      Активировать ключ
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Заглушки для остальных вкладок */}
            {activeTab !== "account" && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="text-5xl mb-4">{menuItems.find(i => i.id === activeTab)?.icon}</div>
                <h2 className="text-2xl font-bold mb-2">
                  {menuItems.find(i => i.id === activeTab)?.label}
                </h2>
                <p className="text-gray-400 text-sm max-w-md">
                  Этот раздел находится в разработке. Скоро здесь появится функционал.
                </p>
              </div>
            )}

          </motion.div>
        </main>
      </div>
    </div>
  );
}