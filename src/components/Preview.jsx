import React from 'react';

// XSS protection function
const esc = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Safe array helpers
const safeArray = (arr) => Array.isArray(arr) ? arr : [];
const safeString = (str) => typeof str === 'string' ? str : '';

function Preview({ config, device, themes }) {
  const theme = themes[config.theme] || themes.dark_neon;
  const colors = theme.colors;

  const deviceStyles = {
    desktop: { width: '100%', maxWidth: '1200px' },
    tablet: { width: '768px' },
    mobile: { width: '375px' },
  };

  const telegramUsername = safeString(config.social?.telegram || '').replace('@', '');

  return (
    <div
      className="preview-frame bg-gray-950 rounded-lg overflow-hidden shadow-2xl"
      style={deviceStyles[device]}
    >
      <style>{`
        .preview-container {
          --accent: ${colors.accent};
          --accent2: ${colors.accent2};
          --site-bg: ${colors.siteBg};
          --card-bg: ${colors.cardBg};
          --text: ${colors.text};
          --text-muted: ${colors.textMuted};
        }
      `}</style>
      <div className="preview-container" style={{ backgroundColor: colors.siteBg, color: colors.text, minHeight: '100%' }}>
        {/* Header */}
        {config.blocks.header && (
          <header style={{ backgroundColor: colors.cardBg, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {config.logo && (
                  <img src={config.logo} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '10px' }} />
                )}
                <div>
                  <h1 style={{ fontSize: '1.5rem', margin: 0, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {esc(config.serverName)}
                  </h1>
                  <p style={{ color: colors.textMuted, fontSize: '0.9rem', margin: 0 }}>{esc(config.serverVersion)}</p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  navigator.clipboard.writeText(config.serverIp);
                  alert('IP скопирован!');
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{esc(config.serverIp)}</span>
              </div>
            </div>
          </header>
        )}

        {/* Hero */}
        {config.blocks.hero && (
          <section style={{ padding: '60px 20px', textAlign: 'center', background: `radial-gradient(circle at center, ${colors.accent}20 0%, transparent 70%)` }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {esc(config.slogan)}
              </h1>
              <p style={{ fontSize: '1.2rem', color: colors.textMuted, marginBottom: '30px' }}>{esc(config.description)}</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button style={{ padding: '15px 30px', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: pointer, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, color: 'white' }}>
                  Начать играть
                </button>
                <button style={{ padding: '15px 30px', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: pointer, background: 'rgba(255,255,255,0.1)', color: colors.text, border: '1px solid rgba(255,255,255,0.2)' }}>
                  Правила
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        {config.blocks.features && (
          <section style={{ padding: '60px 20px', backgroundColor: colors.cardBg }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Особенности сервера
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {safeArray(config.features).map((feature, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: colors.accent }}>{esc(feature.title)}</h3>
                    <p style={{ color: colors.textMuted }}>{esc(feature.desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Rules */}
        {config.blocks.rules && (
          <section style={{ padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Правила
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {safeArray(config.rules).map((rule, index) => (
                  <li key={index} style={{ padding: '15px 20px', marginBottom: '10px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', borderLeft: `3px solid ${colors.accent}` }}>
                    {esc(rule)}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Donate */}
        {config.blocks.donate && (
          <section style={{ padding: '60px 20px', backgroundColor: colors.cardBg }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Донат
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {safeArray(config.donate).map((item, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px', border: `2px solid ${colors.accent}`, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: colors.accent, marginBottom: '15px' }}>{esc(item.price)}</div>
                    <div style={{ color: colors.textMuted }}>{esc(item.perks)}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {config.blocks.faq && (
          <section style={{ padding: '60px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                FAQ
              </h2>
              {safeArray(config.faq).map((item, index) => (
                <div key={index} style={{ marginBottom: '20px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '10px' }}>
                  <h3 style={{ color: colors.accent, marginBottom: '10px' }}>{esc(item.q)}</h3>
                  <p style={{ color: colors.textMuted }}>{esc(item.a)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Team */}
        {config.blocks.team && (
          <section style={{ padding: '60px 20px', backgroundColor: colors.cardBg }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Наша команда
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                {safeArray(config.team).map((member, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
                    <div style={{ width: '70px', height: '70px', background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent2})`, borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>
                      {esc(member.name).charAt(0).toUpperCase()}
                    </div>
                    <h3 style={{ marginBottom: '5px' }}>{esc(member.name)}</h3>
                    <p style={{ color: colors.textMuted }}>{esc(member.role)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* News */}
        {config.blocks.news && (
          <section style={{ padding: '60px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Новости
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {safeArray(config.news).map((item, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '25px', borderRadius: '15px', borderLeft: `3px solid ${colors.accent}` }}>
                    <div style={{ color: colors.accent, fontSize: '0.9rem', marginBottom: '10px' }}>{esc(item.date)}</div>
                    <h3 style={{ marginBottom: '10px' }}>{esc(item.title)}</h3>
                    <p style={{ color: colors.textMuted }}>{esc(item.content)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {config.blocks.gallery && config.gallery?.length > 0 && (
          <section style={{ padding: '60px 20px', backgroundColor: colors.cardBg }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Галерея
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {safeArray(config.gallery).map((img, index) => (
                  <div key={index} style={{ overflow: 'hidden', borderRadius: '15px', aspectRatio: '4/3' }}>
                    <img src={esc(img)} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews */}
        {config.blocks.reviews && config.reviews?.length > 0 && (
          <section style={{ padding: '60px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Отзывы игроков
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {safeArray(config.reviews).map((review, index) => (
                  <div key={index} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '15px', borderTop: `3px solid ${colors.accent}` }}>
                    <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{esc(review.text)}"</p>
                    <p style={{ color: colors.accent, fontWeight: 600 }}>— {esc(review.author)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Discord Widget */}
        {config.social?.discord && (
          <section style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Discord
              </h2>
              <iframe
                src={`https://discord.com/widget?id=${esc(config.social.discord)}&theme=dark`}
                width="350"
                height="500"
                style={{ maxWidth: '100%', borderRadius: '15px', border: 'none' }}
                allowTransparency="true"
              />
            </div>
          </section>
        )}

        {/* Social */}
        {config.blocks.social && (
          <section style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: colors.cardBg }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '30px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent2})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Социальные сети
              </h2>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {config.social?.discord && (
                  <a href={`https://discord.gg/${esc(config.social.discord)}`} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: colors.text, textDecoration: 'none' }}>
                    Discord
                  </a>
                )}
                {config.social?.telegram && (
                  <a href={`https://t.me/${esc(telegramUsername)}`} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: colors.text, textDecoration: 'none' }}>
                    Telegram
                  </a>
                )}
                {config.social?.vk && (
                  <a href={esc(config.social.vk)} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: colors.text, textDecoration: 'none' }}>
                    VK
                  </a>
                )}
                {config.social?.youtube && (
                  <a href={esc(config.social.youtube)} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 30px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: colors.text, textDecoration: 'none' }}>
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        {config.blocks.footer && (
          <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', color: colors.textMuted }}>
            <p>© 2024 {esc(config.serverName)}. Все права защищены.</p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default Preview;
