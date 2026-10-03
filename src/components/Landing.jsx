import React from 'react';
import { Rocket, Palette, Layout, Shield, Zap, Globe } from 'lucide-react';

const templates = [
  { name: 'Survival', icon: '🌲', color: 'from-green-500 to-emerald-600' },
  { name: 'Creative', icon: '🎨', color: 'from-purple-500 to-pink-600' },
  { name: 'Anarchy', icon: '⚔️', color: 'from-red-500 to-orange-600' },
  { name: 'Roleplay', icon: '🎭', color: 'from-blue-500 to-indigo-600' },
  { name: 'Prison', icon: '🔒', color: 'from-gray-500 to-slate-600' },
];

const features = [
  { icon: Layout, title: 'Визуальный редактор', desc: 'Drag & drop интерфейс для быстрой настройки' },
  { icon: Palette, title: '7 тем оформления', desc: 'От неоновой до золотой - выберите свой стиль' },
  { icon: Zap, title: 'Мгновенный превью', desc: 'Смотрите изменения в реальном времени' },
  { icon: Globe, title: 'Адаптивный дизайн', desc: 'Идеально на всех устройствах' },
  { icon: Shield, title: 'Безопасность', desc: 'XSS защита и валидация данных' },
  { icon: Rocket, title: 'Быстрый старт', desc: 'Скачайте готовый HTML за секунды' },
];

function Landing({ onOpenEditor }) {
  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Neon Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="neon-orb absolute top-20 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" style={{ animationDelay: '0s' }} />
        <div className="neon-orb absolute top-40 right-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="neon-orb absolute bottom-20 left-1/3 w-72 h-72 bg-pink-600/30 rounded-full blur-3xl" style={{ animationDelay: '4s' }} />
        <div className="neon-orb absolute bottom-40 right-1/4 w-64 h-64 bg-cyan-600/30 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6">
            CraftPage
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Визуальный конструктор сайтов для Minecraft серверов
          </p>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Создайте красивый сайт за минуты без знания кода. Полностью на стороне клиента — без бэкенда и регистрации.
          </p>
          <button
            onClick={onOpenEditor}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            Открыть редактор
          </button>
        </div>

        {/* Templates Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Готовые шаблоны</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.name}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-gray-600 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
              >
                <div className={`text-5xl mb-3 bg-gradient-to-br ${template.color} bg-clip-text text-transparent`}>
                  {template.icon}
                </div>
                <p className="text-white font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-800/50 rounded-2xl p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Готовы начать?</h2>
            <p className="text-gray-300 mb-8">
              Создайте профессиональный сайт для вашего Minecraft сервера прямо сейчас
            </p>
            <button
              onClick={onOpenEditor}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Начать бесплатно
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-8 text-center text-gray-500">
          <p>CraftPage © 2024. Все права защищены.</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
