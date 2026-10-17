"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // Состояние для окна входа

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/mnpjwkjd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleBuy = (amount: number) => setShowPaymentModal(true);

  return (
    <>
      {/* ===== ЭКРАН ЗАГРУЗКИ ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050508]"
          >
            <div className="flex items-center gap-0">
              <motion.div
                initial={{ scale: 3, opacity: 0, x: 0 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ scale: { duration: 1.5, times: [0, 0.4, 1], ease: "easeInOut" }, opacity: { duration: 0.5 } }}
                className="relative w-16 h-16 flex-shrink-0"
              >
                <Image src="/logo.png" alt="Logo" fill className="object-contain" unoptimized />
              </motion.div>
              <motion.div
                initial={{ width: 0, opacity: 0, x: -20 }}
                animate={{ width: "auto", opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-3xl font-bold tracking-wide text-white pl-4">Winston Visual</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== МОДАЛКА АВТОРИЗАЦИИ (КАК НА 2 ФОТО) ===== */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a0f] border border-white/10 rounded-2xl max-w-4xl w-full flex overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
            >
              <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 text-xl">✕</button>
              
              {/* Левая часть с картинкой */}
              <div className="hidden md:block w-1/2 relative bg-[#050508]">
                <Image src="/auth-bg.jpg" alt="Auth Background" fill className="object-cover opacity-60" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white leading-tight">Сделайте каждую игровую сессию по-настоящему комфортной с нашим продуктом</h3>
                </div>
              </div>

              {/* Правая часть с формой */}
              <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-2">Авторизация</h2>
                <p className="text-gray-400 text-sm mb-8">Войди, чтобы попасть в свой профиль</p>
                
                <form onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
                  <div className="mb-4">
                    <input type="text" placeholder="Введите ваш логин или почту" required className="w-full bg-[#121218] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                  </div>
                  <div className="mb-6 relative">
                    <input type="password" placeholder="Введите пароль" required className="w-full bg-[#121218] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors pr-12" />
                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                      👁️
                    </button>
                  </div>
                  
                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-6">
                    Войти
                  </button>

                  <div className="flex justify-between text-xs text-gray-400">
                    <button type="button" className="hover:text-white transition-colors">Нет аккаунта? Регистрация</button>
                    <button type="button" className="hover:text-white transition-colors">Забыл пароль</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== МОДАЛКА ОПЛАТЫ ===== */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0a0a0f] border border-purple-500/30 p-8 rounded-2xl max-w-md w-full text-center relative shadow-[0_0_50px_rgba(168,85,247,0.2)]">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">✕</button>
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-3xl">💳</span></div>
              <h3 className="text-2xl font-bold mb-3">Оплата временно недоступна</h3>
              <p className="text-gray-400 mb-8">Приём платежей находится на стадии подключения.</p>
              <button onClick={() => setShowPaymentModal(false)} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-all">Понятно</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ОСНОВНОЙ САЙТ ===== */}
      <main className="min-h-screen bg-[#050508] text-white overflow-hidden relative selection:bg-purple-500/30 font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[400px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

        <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative flex items-center justify-center">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain" unoptimized />
            </div>
            <span className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">Winston Visual</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
            <a href="#features" className="hover:text-purple-300 transition-colors">Возможности</a>
            <a href="#pricing" className="hover:text-purple-300 transition-colors">Подписка</a>
            <a href="#support" className="hover:text-purple-300 transition-colors">Поддержка</a>
          </div>
          <div className="flex gap-4">
            {/* Кнопка Войти теперь открывает модалку */}
            <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 px-3">Войти</button>
            <button onClick={() => handleBuy(0)} className="bg-purple-600/20 border border-purple-500/50 text-purple-300 hover:bg-purple-600/40 text-sm font-medium py-2 px-5 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">Купить</button>
          </div>
        </nav>

        <section className="relative z-10 flex flex-col items-center justify-center text-center mt-24 px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-purple-400 font-semibold tracking-widest uppercase text-xs mb-4 block border border-purple-500/30 bg-purple-500/10 py-1 px-3 rounded-full w-max mx-auto backdrop-blur-sm">Welcome to the Future</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">Твой мир.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600">Твои правила.</span></h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">Winston Visuals — лаконичный клиент для тех, кто ценит стиль, скорость и комфорт в каждой детали. Полный контроль над визуалом.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 px-10 rounded-xl transition-all shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] border border-purple-400/50 text-center">Скачать лаунчер</a>
            <a href="#pricing" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-10 rounded-xl transition-all backdrop-blur-md text-center">Купить подписку</a>
          </motion.div>
        </section>

        <section id="features" className="relative z-10 max-w-7xl mx-auto mt-40 px-8 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Всё, что нужно для игры</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Наши визуалы сочетают в себе передовые технологии и эстетику. Каждая деталь продумана.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[ { title: "TargetESP", desc: "Умный рендер цели с облетом и свечением. Ни одна цель не уйдет." }, { title: "Chams", desc: "Визуализация сущностей сквозь стены с настройкой цвета и фильтров." }, { title: "NameTags", desc: "Красивые никнеймы, HP-полоски и дистанция над головой." } ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all group backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] group-hover:bg-purple-500/20 transition-all" />
                <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mb-6"><div className="w-6 h-6 bg-purple-400 rounded-sm" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-8 pb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Выбери свой тариф</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Оплата через СБП, Сбербанк или Т-Банк. Доступ активируется моментально после оплаты.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col backdrop-blur-sm relative">
              <h3 className="text-xl font-bold mb-2">На 30 дней</h3>
              <p className="text-gray-400 text-sm mb-6">Отличный старт для знакомства</p>
              <div className="text-4xl font-black mb-6">299 <span className="text-lg text-gray-400 font-medium">₽</span></div>
              <ul className="text-sm text-gray-300 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Все визуалы</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Автообновления</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Поддержка 24/7</li>
              </ul>
              <button onClick={() => handleBuy(299)} className="block text-center w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-semibold transition-all">Купить</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-b from-purple-900/20 to-white/[0.02] border border-purple-500/50 p-8 rounded-2xl flex flex-col backdrop-blur-sm relative shadow-[0_0_40px_rgba(168,85,247,0.15)] md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Популярный</div>
              <h3 className="text-xl font-bold mb-2">Навсегда</h3>
              <p className="text-gray-400 text-sm mb-6">Купи один раз и забудь</p>
              <div className="text-4xl font-black mb-6">1490 <span className="text-lg text-gray-400 font-medium">₽</span></div>
              <ul className="text-sm text-gray-300 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Все визуалы</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Автообновления</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Поддержка 24/7</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Доступ к новым фичам</li>
              </ul>
              <button onClick={() => handleBuy(1490)} className="block text-center w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]">Купить навсегда</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col backdrop-blur-sm relative">
              <h3 className="text-xl font-bold mb-2">На 1 год</h3>
              <p className="text-gray-400 text-sm mb-6">Для тех, кто играет долго</p>
              <div className="text-4xl font-black mb-6">990 <span className="text-lg text-gray-400 font-medium">₽</span></div>
              <ul className="text-sm text-gray-300 space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Все визуалы</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Автообновления</li>
                <li className="flex items-center gap-2"><span className="text-purple-400">✓</span> Поддержка 24/7</li>
              </ul>
              <button onClick={() => handleBuy(990)} className="block text-center w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-semibold transition-all">Купить</button>
            </motion.div>
          </div>
        </section>

        <section id="support" className="relative z-10 max-w-3xl mx-auto px-8 pb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Служба поддержки</h2>
            <p className="text-gray-400">Возникли вопросы или проблемы? Напишите нам, и мы ответим в ближайшее время.</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Ваш Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors" placeholder="you@example.com" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Сообщение</label>
              <textarea id="message" name="message" required rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" placeholder="Опишите вашу проблему..."></textarea>
            </div>
            <button type="submit" disabled={status === "sending"} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "sending" ? "Отправка..." : "Отправить сообщение"}
            </button>
            {status === "success" && (<p className="text-green-400 text-center mt-4">Спасибо! Ваше сообщение отправлено.</p>)}
            {status === "error" && (<p className="text-red-400 text-center mt-4">Произошла ошибка. Попробуйте позже.</p>)}
          </form>
        </section>

        <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-500 text-sm bg-black/20 backdrop-blur-sm">
          © 2026 Winston Visual. Все права защищены.
        </footer>
      </main>
    </>
  );
}