import React from 'react';
import { Settings, Layout, Palette, Upload, Plus, Trash2, Image, MessageSquare, Users, Newspaper, BarChart3, Share2 } from 'lucide-react';

function Sidebar({ config, activeTab, setActiveTab, updateConfig, themes }) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (path, defaultItem) => {
    const currentArray = path.split('.').reduce((obj, key) => obj?.[key], config) || [];
    updateConfig(path, [...currentArray, defaultItem]);
  };

  const removeArrayItem = (path, index) => {
    const currentArray = path.split('.').reduce((obj, key) => obj?.[key], config) || [];
    updateConfig(path, currentArray.filter((_, i) => i !== index));
  };

  const updateArrayItem = (path, index, field, value) => {
    const currentArray = path.split('.').reduce((obj, key) => obj?.[key], config) || [];
    const newArray = [...currentArray];
    newArray[index] = { ...newArray[index], [field]: value };
    updateConfig(path, newArray);
  };

  return (
    <div className="w-96 bg-gray-900 border-r border-gray-800 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors ${
            activeTab === 'basic' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Settings className="w-4 h-4" />
          Основное
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors ${
            activeTab === 'content' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Layout className="w-4 h-4" />
          Контент
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 font-medium transition-colors ${
            activeTab === 'design' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          <Palette className="w-4 h-4" />
          Дизайн
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Название сервера</label>
              <input
                type="text"
                value={config.serverName}
                onChange={(e) => updateConfig('serverName', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">IP адрес</label>
              <input
                type="text"
                value={config.serverIp}
                onChange={(e) => updateConfig('serverIp', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Версия</label>
              <input
                type="text"
                value={config.serverVersion}
                onChange={(e) => updateConfig('serverVersion', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Слоган</label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => updateConfig('slogan', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Описание</label>
              <textarea
                value={config.description}
                onChange={(e) => updateConfig('description', e.target.value)}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Логотип</label>
              <div className="flex items-center gap-4">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="w-16 h-16 rounded-lg object-cover" />
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Загрузить</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Block Toggles */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Видимость блоков</h3>
              <div className="space-y-2">
                {Object.entries(config.blocks).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-400 capitalize">{key}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateConfig(`blocks.${key}`, e.target.checked)}
                      className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-purple-500 focus:ring-purple-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Особенности</h3>
                <button
                  onClick={() => addArrayItem('features', { title: '', desc: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.features?.map((feature, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateArrayItem('features', index, 'title', e.target.value)}
                        placeholder="Заголовок"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('features', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={feature.desc}
                      onChange={(e) => updateArrayItem('features', index, 'desc', e.target.value)}
                      placeholder="Описание"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Правила</h3>
                <button
                  onClick={() => addArrayItem('rules', '')}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2">
                {config.rules?.map((rule, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => updateArrayItem('rules', index, '', e.target.value)}
                      placeholder="Правило"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => removeArrayItem('rules', index)}
                      className="p-1 hover:bg-gray-800 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Donate */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Донат</h3>
                <button
                  onClick={() => addArrayItem('donate', { price: '', perks: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.donate?.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => updateArrayItem('donate', index, 'price', e.target.value)}
                        placeholder="Цена"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('donate', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.perks}
                      onChange={(e) => updateArrayItem('donate', index, 'perks', e.target.value)}
                      placeholder="Привилегии"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">FAQ</h3>
                <button
                  onClick={() => addArrayItem('faq', { q: '', a: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.faq?.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.q}
                        onChange={(e) => updateArrayItem('faq', index, 'q', e.target.value)}
                        placeholder="Вопрос"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('faq', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.a}
                      onChange={(e) => updateArrayItem('faq', index, 'a', e.target.value)}
                      placeholder="Ответ"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Команда
                </h3>
                <button
                  onClick={() => addArrayItem('team', { name: '', role: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.team?.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateArrayItem('team', index, 'name', e.target.value)}
                        placeholder="Никнейм"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('team', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => updateArrayItem('team', index, 'role', e.target.value)}
                      placeholder="Роль"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  Новости
                </h3>
                <button
                  onClick={() => addArrayItem('news', { title: '', date: '', content: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.news?.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateArrayItem('news', index, 'title', e.target.value)}
                        placeholder="Заголовок"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('news', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => updateArrayItem('news', index, 'date', e.target.value)}
                      placeholder="Дата (YYYY-MM-DD)"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => updateArrayItem('news', index, 'content', e.target.value)}
                      placeholder="Содержание"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Галерея
                </h3>
                <button
                  onClick={() => addArrayItem('gallery', '')}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-2">
                {config.gallery?.map((img, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => updateArrayItem('gallery', index, '', e.target.value)}
                      placeholder="URL изображения"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={() => removeArrayItem('gallery', index)}
                      className="p-1 hover:bg-gray-800 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Отзывы
                </h3>
                <button
                  onClick={() => addArrayItem('reviews', { text: '', author: '' })}
                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="space-y-3">
                {config.reviews?.map((item, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.author}
                        onChange={(e) => updateArrayItem('reviews', index, 'author', e.target.value)}
                        placeholder="Никнейм"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => removeArrayItem('reviews', index)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => updateArrayItem('reviews', index, 'text', e.target.value)}
                      placeholder="Текст отзыва"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4" />
                Статистика
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.statistics?.players || ''}
                  onChange={(e) => updateConfig('statistics.players', e.target.value)}
                  placeholder="Игроков онлайн"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={config.statistics?.uptime || ''}
                  onChange={(e) => updateConfig('statistics.uptime', e.target.value)}
                  placeholder="Uptime"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={config.statistics?.worlds || ''}
                  onChange={(e) => updateConfig('statistics.worlds', e.target.value)}
                  placeholder="Миров"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 flex items-center gap-2 mb-3">
                <Share2 className="w-4 h-4" />
                Социальные сети
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.social?.discord || ''}
                  onChange={(e) => updateConfig('social.discord', e.target.value)}
                  placeholder="Discord ID (для виджета)"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={config.social?.telegram || ''}
                  onChange={(e) => updateConfig('social.telegram', e.target.value)}
                  placeholder="Telegram (без @)"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={config.social?.vk || ''}
                  onChange={(e) => updateConfig('social.vk', e.target.value)}
                  placeholder="VK URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={config.social?.youtube || ''}
                  onChange={(e) => updateConfig('social.youtube', e.target.value)}
                  placeholder="YouTube URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">О сервере</label>
              <textarea
                value={config.about || ''}
                onChange={(e) => updateConfig('about', e.target.value)}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Contacts */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="text"
                value={config.contacts?.email || ''}
                onChange={(e) => updateConfig('contacts.email', e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'design' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">Тема оформления</label>
              <div className="space-y-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => updateConfig('theme', key)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      config.theme === key
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accent2})`,
                        }}
                      />
                      <span className="text-white">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Акцентный цвет</label>
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => updateConfig('accentColor', e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
