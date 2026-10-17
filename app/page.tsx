"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-hidden relative selection:bg-purple-500/30 font-sans">
      
      {/* Стеклянные волны на фоне (Glassmorphism blobs) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[20%] w-[800px] h-[400px] bg-violet-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Стеклянная сетка поверх фона */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Навигация */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Логотип */}
          <div className="w-12 h-12 relative flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={48}
              height={48}
              className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              unoptimized
            />
          </div>
          <span className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-400">
            Winston Visual
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
          <a href="#features" className="hover:text-purple-300 transition-colors">Возможности</a>
          <a href="#pricing" className="hover:text-purple-300 transition-colors">Подписка</a>
          <a href="#support" className="hover:text-purple-300 transition-colors">Поддержка</a>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Войти</button>
          <button className="bg-purple-600/20 border border-purple-500/50 text-purple-300 hover:bg-purple-600/40 text-sm font-medium py-2 px-5 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            Купить
          </button>
        </div>
      </nav>

      {/* Главный экран (Hero) */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center mt-24 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-purple-400 font-semibold tracking-widest uppercase text-xs mb-4 block border border-purple-500/30 bg-purple-500/10 py-1 px-3 rounded-full w-max mx-auto backdrop-blur-sm">
            Welcome to the Future
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            Твой мир.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              Твои правила.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Winston Visuals — лаконичный клиент для тех, кто ценит стиль, 
            скорость и комфорт в каждой детали. Полный контроль над визуалом.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-4 px-10 rounded-xl transition-all shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] border border-purple-400/50">
            Скачать лаунчер
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-10 rounded-xl transition-all backdrop-blur-md">
            Купить подписку
          </button>
        </motion.div>
      </section>

      {/* Секция фич (Glass Cards) */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto mt-40 px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Всё, что нужно для игры</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Наш софт сочетает в себе передовые технологии и эстетику. Каждая деталь продумана.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "TargetESP", desc: "Умный рендер цели с облетом и свечением. Ни одна цель не уйдет." },
            { title: "Chams", desc: "Визуализация сущностей сквозь стены с настройкой цвета и фильтров." },
            { title: "NameTags", desc: "Красивые никнеймы, HP-полоски и дистанция над головой." },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all group backdrop-blur-sm relative overflow-hidden"
            >
              {/* Внутреннее свечение карточки */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] group-hover:bg-purple-500/20 transition-all" />
              
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <div className="w-6 h-6 bg-purple-400 rounded-sm shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Футер */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-gray-500 text-sm bg-black/20 backdrop-blur-sm">
        © 2026 Winston Visual. Все права защищены.
      </footer>
    </main>
  );
}