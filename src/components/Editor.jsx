import React, { useState } from 'react';
import { ArrowLeft, Download, Monitor, Tablet, Smartphone } from 'lucide-react';
import Sidebar from './Sidebar';
import Preview from './Preview';

// XSS protection function
const esc =(str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// URL validation
const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Default config state
const defaultConfig = {
  // Basic settings
  serverName: 'My Minecraft Server',
  serverIp: 'play.myserver.com',
  serverVersion: '1.20.4',
  slogan: 'Лучший сервер для игры с друзьями',
  description: 'Добро пожаловать на наш сервер! Здесь вы найдете увлекательный геймплей, дружелюбное комьюнити и постоянные обновления.',
  logo: '', // Base64 string

  // Content blocks visibility
  blocks: {
    header: true,
    hero: true,
    features: true,
    rules: true,
    donate: true,
    faq: true,
    contacts: true,
    about: true,
    team: true,
    news: true,
    statistics: true,
    social: true,
    footer: true,
  },

  // Features
  features: [
    { title: 'Стабильный сервер', desc: '99.9% uptime без лагов' },
    { title: 'Дружелюбное комьюнити', desc: 'Помощь новичкам и интересные события' },
    { title: 'Уникальные плагины', desc: 'Кастомные механики и фичи' },
    { title: 'Регулярные ивенты', desc: 'Конкурсы и турниры с призами' },
    { title: 'Античит защита', desc: 'Честная игра для всех' },
    { title: 'Быстрая поддержка', desc: 'Ответы на вопросы в чате' },
  ],

  // Rules
  rules: [
    'Запрещено использование читов и багов',
    'Уважайте других игроков и администрацию',
    'Не спамьте в чате и не оскорбляйте',
    'Не используйте эксплойты и глитчи',
    'Следите за своим языком',
  ],

  // Donate
  donate: [
    { price: '100₽', perks: 'VIP статус на 30 дней' },
    { price: '300₽', perks: 'Premium статус на 30 дней + набор' },
    { price: '500₽', perks: 'Legendary статус на 30 дней + эксклюзивный кит' },
  ],

  // FAQ
  faq: [
    { q: 'Как начать играть?', a: 'Зайдите на сервер по IP, указанному выше, и следуйте инструкциям' },
    { q: 'Есть ли вайтлист?', a: 'Нет, сервер открыт для всех игроков' },
    { q: 'Как связаться с админом?', a: 'Напишите в Discord или на почту' },
  ],

  // Contacts
  contacts: {
    email: 'admin@myserver.com',
    discord: 'discord.gg/myserver',
  },

  // About
  about: 'Наш сервер существует с 2020 года. Мы создали место, где каждый игрок может найти себе друзей и насладиться игрой. Наша команда постоянно работает над улучшением сервера и добавлением нового контента.',

  // Team
  team: [
    { name: 'AdminSteve', role: 'Владелец' },
    { name: 'ModerAlex', role: 'Модератор' },
    { name: 'BuilderMax', role: 'Билдер' },
  ],

  // News
  news: [
    { title: 'Новое обновление!', date: '2024-01-15', content: 'Добавлены новые биомы и механики' },
    { title: 'Ивент на выходные', date: '2024-01-10', content: 'Участвуйте в конкурсе строительства' },
  ],

  // Statistics
  statistics: {
    players: '1250',
    uptime: '99.9%',
    worlds: '5',
  },

  // Social
  social: {
    discord: 'myserver',
    telegram: 'myserver_channel',
    vk: '',
    youtube: '',
  },

  // Gallery
  gallery: [
    'https://via.placeholder.com/400x300/6366f1/ffffff?text=Screenshot+1',
    'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Screenshot+2',
    'https://via.placeholder.com/400x300/ec4899/ffffff?text=Screenshot+3',
  ],

  // Reviews
  reviews: [
    { text: 'Лучший сервер на котором я играл!', author: 'Player123' },
    { text: 'Отличная администрация и комьюнити', author: 'MinecraftFan' },
  ],

  // Design
  theme: 'dark_neon',
  accentColor: '#8b5cf6',
};

// Theme definitions
const themes = {
  dark_neon: {
    name: 'Тёмная неоновая',
    colors: {
      accent: '#8b5cf6',
      accent2: '#ec4899',
      siteBg: '#0a0a0f',
      cardBg: '#1a1a2e',
      text: '#ffffff',
      textMuted: '#a0a0a0',
    },
  },
  ocean: {
    name: 'Океан',
    colors: {
      accent: '#0ea5e9',
      accent2: '#06b6d4',
      siteBg: '#0c1929',
      cardBg: '#1e3a5f',
      text: '#e0f2fe',
      textMuted: '#94a3b8',
    },
  },
  sunset: {
    name: 'Закат',
    colors: {
      accent: '#f97316',
      accent2: '#ef4444',
      siteBg: '#1a0a0a',
      cardBg: '#2d1a1a',
      text: '#fef3c7',
      textMuted: '#d6d3d1',
    },
  },
  forest: {
    name: 'Лес',
    colors: {
      accent: '#22c55e',
      accent2: '#16a34a',
      siteBg: '#0a1a0a',
      cardBg: '#1a2e1a',
      text: '#ecfdf5',
      textMuted: '#a7f3d0',
    },
  },
  halloween: {
    name: 'Хэллоуин 🎃',
    colors: {
      accent: '#f97316',
      accent2: '#a855f7',
      siteBg: '#1a0a1a',
      cardBg: '#2d1a2d',
      text: '#fef3c7',
      textMuted: '#d6d3d1',
    },
  },
  cyberpunk: {
    name: 'Киберпанк',
    colors: {
      accent: '#00ff88',
      accent2: '#ff00ff',
      siteBg: '#0a0a0a',
      cardBg: '#1a1a1a',
      text: '#ffffff',
      textMuted: '#808080',
    },
  },
  gold: {
    name: 'Золото',
    colors: {
      accent: '#fbbf24',
      accent2: '#f59e0b',
      siteBg: '#1a150a',
      cardBg: '#2d2515',
      text: '#fef3c7',
      textMuted: '#d6d3d1',
    },
  },
};

function Editor({ onBack }) {
  const [config, setConfig] = useState(defaultConfig);
  const [activeTab, setActiveTab] = useState('basic');
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const updateConfig = (path, value) => {
    setConfig(prev => {
      const newConfig = { ...prev };
      let current = newConfig;
      const keys = path.split('.');
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  const downloadSite = () => {
    const html = generateSiteHtml(config);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${esc(config.serverName).replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <h1 className="text-xl font-bold text-white">CraftPage Editor</h1>
        </div>
        <button
          onClick={downloadSite}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all duration-300"
        >
          <Download className="w-4 h-4" />
          Скачать HTML
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          updateConfig={updateConfig}
          themes={themes}
        />

        {/* Preview */}
        <div className="flex-1 flex flex-col bg-gray-900/50">
          {/* Device Switcher */}
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-center gap-2">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'desktop' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'tablet' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                previewDevice === 'mobile' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 p-6 overflow-auto flex items-center justify-center">
            <Preview config={config} device={previewDevice} themes={themes} />
          </div>
        </div>
      </div>
    </div>
  );
}

// HTML Generation Function
function generateSiteHtml(config) {
  const esc = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const theme = themes[config.theme] || themes.dark_neon;
  const colors = theme.colors;

  // Safe array helpers
  const safeArray = (arr) => Array.isArray(arr) ? arr : [];
  const safeString = (str) => typeof str === 'string' ? str : '';

  // Build features HTML
  const featuresHtml = safeArray(config.features).map(f => `
    <div class="feature-card">
      <h3>${esc(f.title || '')}</h3>
      <p>${esc(f.desc || '')}</p>
    </div>
  `).join('');

  // Build rules HTML
  const rulesHtml = safeArray(config.rules).map(r => `
    <li>${esc(r)}</li>
  `).join('');

  // Build donate HTML
  const donateHtml = safeArray(config.donate).map(d => `
    <div class="donate-card">
      <div class="donate-price">${esc(d.price || '')}</div>
      <div class="donate-perks">${esc(d.perks || '')}</div>
    </div>
  `).join('');

  // Build FAQ HTML
  const faqHtml = safeArray(config.faq).map(f => `
    <div class="faq-item">
      <h3>${esc(f.q || '')}</h3>
      <p>${esc(f.a || '')}</p>
    </div>
  `).join('');

  // Build team HTML
  const teamHtml = safeArray(config.team).map(t => `
    <div class="team-card">
      <div class="team-avatar">${esc(t.name || '').charAt(0).toUpperCase()}</div>
      <h3>${esc(t.name || '')}</h3>
      <p>${esc(t.role || '')}</p>
    </div>
  `).join('');

  // Build news HTML
  const newsHtml = safeArray(config.news).map(n => `
    <div class="news-card">
      <div class="news-date">${esc(n.date || '')}</div>
      <h3>${esc(n.title || '')}</h3>
      <p>${esc(n.content || '')}</p>
    </div>
  `).join('');

  // Build gallery HTML
  const galleryHtml = safeArray(config.gallery).map(img => `
    <div class="gallery-item">
      <img src="${esc(img)}" alt="Gallery image" loading="lazy" />
    </div>
  `).join('');

  // Build reviews HTML
  const reviewsHtml = safeArray(config.reviews).map(r => `
    <div class="review-card">
      <p class="review-text">"${esc(r.text || '')}"</p>
      <p class="review-author">— ${esc(r.author || '')}</p>
    </div>
  `).join('');

  // Telegram username cleanup
  const telegramUsername = safeString(config.social?.telegram || '').replace('@', '');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(config.serverName)}</title>
  <style>
    :root {
      --accent: ${colors.accent};
      --accent2: ${colors.accent2};
      --site-bg: ${colors.siteBg};
      --card-bg: ${colors.cardBg};
      --text: ${colors.text};
      --text-muted: ${colors.textMuted};
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: var(--site-bg);
      color: var(--text);
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes gradient-text {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }

    .animate-slide-in {
      animation: slideIn 0.6s ease-out forwards;
    }

    .btn-shimmer {
      background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent));
      background-size: 200% auto;
      animation: shimmer 3s linear infinite;
    }

    /* Header */
    .header {
      background: var(--card-bg);
      padding: 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }

    .logo-text h1 {
      font-size: 1.5rem;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-text 3s ease infinite;
    }

    .server-ip {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.05);
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .server-ip:hover {
      background: rgba(255,255,255,0.1);
    }

    .server-ip span {
      font-family: monospace;
      font-size: 1.1rem;
    }

    /* Hero */
    .hero {
      padding: 100px 0;
      text-align: center;
      background: radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-text 3s ease infinite;
    }

    .hero p {
      font-size: 1.3rem;
      color: var(--text-muted);
      margin-bottom: 30px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn {
      padding: 15px 30px;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    }

    .btn-secondary {
      background: rgba(255,255,255,0.1);
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.2);
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.2);
    }

    /* Features */
    .features {
      padding: 80px 0;
      background: var(--card-bg);
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 50px;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-text 3s ease infinite;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .feature-card {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      border-color: var(--accent);
    }

    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: var(--accent);
    }

    .feature-card p {
      color: var(--text-muted);
    }

    /* Rules */
    .rules {
      padding: 80px 0;
    }

    .rules-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .rules-list li {
      padding: 15px 20px;
      margin-bottom: 10px;
      background: rgba(255,255,255,0.05);
      border-radius: 10px;
      border-left: 3px solid var(--accent);
      list-style: none;
    }

    /* Donate */
    .donate {
      padding: 80px 0;
      background: var(--card-bg);
    }

    .donate-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .donate-card {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 15px;
      border: 2px solid var(--accent);
      text-align: center;
      transition: all 0.3s;
    }

    .donate-card:hover {
      transform: scale(1.05);
    }

    .donate-price {
      font-size: 2rem;
      font-weight: bold;
      color: var(--accent);
      margin-bottom: 15px;
    }

    .donate-perks {
      color: var(--text-muted);
    }

    /* FAQ */
    .faq {
      padding: 80px 0;
    }

    .faq-item {
      max-width: 800px;
      margin: 0 auto 20px;
      background: rgba(255,255,255,0.05);
      padding: 25px;
      border-radius: 10px;
    }

    .faq-item h3 {
      color: var(--accent);
      margin-bottom: 10px;
    }

    .faq-item p {
      color: var(--text-muted);
    }

    /* Team */
    .team {
      padding: 80px 0;
      background: var(--card-bg);
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
    }

    .team-card {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 15px;
      text-align: center;
      transition: all 0.3s;
    }

    .team-card:hover {
      transform: translateY(-5px);
    }

    .team-avatar {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      border-radius: 50%;
      margin: 0 auto 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
    }

    .team-card h3 {
      margin-bottom: 5px;
    }

    .team-card p {
      color: var(--text-muted);
    }

    /* News */
    .news {
      padding: 80px 0;
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .news-card {
      background: rgba(255,255,255,0.05);
      padding: 25px;
      border-radius: 15px;
      border-left: 3px solid var(--accent);
    }

    .news-date {
      color: var(--accent);
      font-size: 0.9rem;
      margin-bottom: 10px;
    }

    .news-card h3 {
      margin-bottom: 10px;
    }

    .news-card p {
      color: var(--text-muted);
    }

    /* Gallery */
    .gallery {
      padding: 80px 0;
      background: var(--card-bg);
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .gallery-item {
      overflow: hidden;
      border-radius: 15px;
      aspect-ratio: 4/3;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .gallery-item:hover img {
      transform: scale(1.1);
    }

    /* Reviews */
    .reviews {
      padding: 80px 0;
    }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }

    .review-card {
      background: rgba(255,255,255,0.05);
      padding: 30px;
      border-radius: 15px;
      border-top: 3px solid var(--accent);
    }

    .review-text {
      font-style: italic;
      margin-bottom: 15px;
      color: var(--text);
    }

    .review-author {
      color: var(--accent);
      font-weight: 600;
    }

    /* Discord Widget */
    .discord-widget {
      padding: 40px 0;
      text-align: center;
    }

    .discord-widget iframe {
      max-width: 100%;
      border-radius: 15px;
    }

    /* Social */
    .social {
      padding: 60px 0;
      text-align: center;
      background: var(--cardBg);
    }

    .social-links {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .social-btn {
      padding: 15px 30px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 10px;
      color: var(--text);
      text-decoration: none;
      transition: all 0.3s;
    }

    .social-btn:hover {
      background: var(--accent);
      border-color: var(--accent);
    }

    /* Footer */
    .footer {
      padding: 40px 0;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: var(--text-muted);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2rem;
      }

      .hero p {
        font-size: 1rem;
      }

      .features-grid,
      .donate-grid,
      .team-grid,
      .news-grid,
      .gallery-grid,
      .reviews-grid {
        grid-template-columns: 1fr;
      }

      .header-content {
        flex-direction: column;
        gap: 15px;
      }

      .hero-buttons {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  ${config.blocks.header ? `
  <header class="header">
    <div class="container header-content">
      <div class="logo">
        ${config.logo ? `<img src="${esc(config.logo)}" alt="Logo">` : ''}
        <div class="logo-text">
          <h1>${esc(config.serverName)}</h1>
          <p style="color: var(--text-muted); font-size: 0.9rem;">${esc(config.serverVersion)}</p>
        </div>
      </div>
      <div class="server-ip" onclick="navigator.clipboard.writeText('${esc(config.serverIp)}'); this.querySelector('.copy-hint').textContent = 'Скопировано!'; setTimeout(() => this.querySelector('.copy-hint').textContent = 'Нажмите, чтобы скопировать', 2000);">
        <span>${esc(config.serverIp)}</span>
        <span class="copy-hint" style="font-size: 0.8rem; color: var(--text-muted);">Нажмите, чтобы скопировать</span>
      </div>
    </div>
  </header>
  ` : ''}

  ${config.blocks.hero ? `
  <section class="hero">
    <div class="container">
      <h1 class="animate-fade-in">${esc(config.slogan)}</h1>
      <p class="animate-fade-in" style="animation-delay: 0.2s;">${esc(config.description)}</p>
      <div class="hero-buttons animate-fade-in" style="animation-delay: 0.4s;">
        <a href="#" class="btn btn-primary btn-shimmer">Начать играть</a>
        <a href="#rules" class="btn btn-secondary">Правила</a>
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.features ? `
  <section class="features">
    <div class="container">
      <h2 class="section-title">Особенности сервера</h2>
      <div class="features-grid">
        ${featuresHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.rules ? `
  <section class="rules" id="rules">
    <div class="container">
      <h2 class="section-title">Правила</h2>
      <ul class="rules-list">
        ${rulesHtml}
      </ul>
    </div>
  </section>
  ` : ''}

  ${config.blocks.donate ? `
  <section class="donate">
    <div class="container">
      <h2 class="section-title">Донат</h2>
      <div class="donate-grid">
        ${donateHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.faq ? `
  <section class="faq">
    <div class="container">
      <h2 class="section-title">FAQ</h2>
      ${faqHtml}
    </div>
  </section>
  ` : ''}

  ${config.blocks.team ? `
  <section class="team">
    <div class="container">
      <h2 class="section-title">Наша команда</h2>
      <div class="team-grid">
        ${teamHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.news ? `
  <section class="news">
    <div class="container">
      <h2 class="section-title">Новости</h2>
      <div class="news-grid">
        ${newsHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.gallery && config.gallery?.length > 0 ? `
  <section class="gallery">
    <div class="container">
      <h2 class="section-title">Галерея</h2>
      <div class="gallery-grid">
        ${galleryHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.reviews && config.reviews?.length > 0 ? `
  <section class="reviews">
    <div class="container">
      <h2 class="section-title">Отзывы игроков</h2>
      <div class="reviews-grid">
        ${reviewsHtml}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.social?.discord ? `
  <section class="discord-widget">
    <div class="container">
      <h2 class="section-title">Discord</h2>
      <iframe src="https://discord.com/widget?id=${esc(config.social.discord)}&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
    </div>
  </section>
  ` : ''}

  ${config.blocks.social ? `
  <section class="social">
    <div class="container">
      <h2 class="section-title">Социальные сети</h2>
      <div class="social-links">
        ${config.social?.discord ? `<a href="https://discord.gg/${esc(config.social.discord)}" target="_blank" class="social-btn">Discord</a>` : ''}
        ${config.social?.telegram ? `<a href="https://t.me/${esc(telegramUsername)}" target="_blank" class="social-btn">Telegram</a>` : ''}
        ${config.social?.vk ? `<a href="${esc(config.social.vk)}" target="_blank" class="social-btn">VK</a>` : ''}
        ${config.social?.youtube ? `<a href="${esc(config.social.youtube)}" target="_blank" class="social-btn">YouTube</a>` : ''}
      </div>
    </div>
  </section>
  ` : ''}

  ${config.blocks.footer ? `
  <footer class="footer">
    <div class="container">
      <p>© 2024 ${esc(config.serverName)}. Все права защищены.</p>
    </div>
  </footer>
  ` : ''}
</body>
</html>`;
}

export default Editor;
