import React, { useEffect, useState } from 'react';

const folders = [
  {
    title: 'Входной\nдиагностический\nтест',
    description: 'Небольшая диагностика поможет увидеть текущую точку, заметить сильные стороны и определить, с чего удобнее начать сезон.'
  },
  {
    title: 'Входной\nдиагностический\nтест',
    description: 'Вернитесь к вопросам в удобное время: это не экзамен и не оценка родительских навыков, а способ лучше понять свои задачи.'
  },
  {
    title: 'Клинические\nкейсы',
    description: 'Практические ситуации из жизни семей. Разбираем возможные шаги, обсуждаем варианты поддержки и ищем подходящее решение.'
  }
];

const letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'.split('');
const tariffDetails = {
  intro: {
    title: 'Знакомство',
    price: '0 ₽',
    body: 'Идеально для того, чтобы ознакомиться с форматом и найти для себя первые ответы.\n\n• Доступ к вводному модулю и базовым памяткам платформы.\n• Участие в одной открытой встрече-знакомстве с куратором и родителями.\n• Доступ в общий чат сезона для навигации и общения.\n• Возможность перейти на основной тариф «Полный ориентир» в любой момент.'
  },
  full: {
    title: 'Полный ориентир',
    price: '799 ₽',
    body: 'Для тех, кому нужны видеоинструкции и глубокая поддержка на протяжении всего сезона.\n\n• Короткие и содержательные уроки, которые можно смотреть в любое время.\n• Все рабочие материалы: шаблоны заявлений, чек-листы и пошаговые алгоритмы действий.\n• Регулярные онлайн-созвоны в малых группах, где можно разобрать вашу конкретную ситуацию.\n• Возможность задать свой вопрос эксперту и получить адресный разбор.'
  }
};

function FolderCard({ title, onClick, className = '' }) {
  return (
    <button className={`folder-card ${className}`} onClick={onClick} type="button">
      <span className="folder-card__tab" />
      <span className="folder-card__face">{title.split('\n').map((line, i) => <span key={i}>{line}</span>)}</span>
    </button>
  );
}

function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть окно">×</button>
        <p className="eyebrow">СВОЙ ОРИЕНТИР</p>
        <h2 id="modal-title">{title}</h2>
        <div className="modal__content">{children}</div>
      </section>
    </div>
  );
}

function App() {
  const [modal, setModal] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [formSent, setFormSent] = useState(false);

  const openModal = (content) => {
    setFormSent(false);
    setModal(content);
  };

  const openSignup = (plan) => openModal({ kind: 'signup', plan });

  const closeModal = () => setModal(null);

  const handleSignup = (event) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Свой ориентир — на главную">
          <img src="/assets/logo.png" alt="Сезонный трек для родителей детей с ТМНР — Свой ориентир" />
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          <a href="#parents">Родителям</a>
          <a href="#glossary">Глоссарий</a>
          <a href="#steps">Подручный</a>
          <a href="#pricing">Тарифы</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-label="О сезонном треке">
          <div className="hero-poster">
            <div className="hero-poster__glow" />
            <p>Сезонный трек<br />для родителей<br />детей с ТМНР</p>
            <strong>«Свой ориентир»</strong>
          </div>
          <div className="hero-side">
            <div className="intro-card">
              <p><b>Сезонный трек «Свой ориентир»</b> — это бережное пространство и понятная опора для родителей детей с ТМНР. Мы знаем, сколько сил и времени может уходить на ежедневную заботу о ребёнке. Когда всё держится на вас, легко потерять точку опоры и остаться один на один с тревогой.</p>
              <p className="intro-card__subhead">Что ждёт вас внутри сезона:</p>
              <ul>
                <li>Понятные разборы без лишней информации. Разбор сложных задач из жизни, чтобы вы сразу знали, какой шаг сделать следующим.</li>
                <li>Поддержка окружающих. Безопасное пространство, где можно выдохнуть, задать наболевший вопрос или просто порассуждать без страха осуждения.</li>
                <li>Проверенные ориентиры. Готовые памятки, чек-листы и инструкции, которые экономят ваше время и нервы.</li>
              </ul>
              <p className="intro-card__closing"><b>«Свой ориентир»</b> — это ваш личный маршрут в кругу людей, которые понимают без лишних слов. Выбирайте комфортный формат участия, выделяйте для себя важное и помните — вы не одни.</p>
            </div>
            <button className="section-banner" type="button" onClick={() => document.querySelector('#parents')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src="/assets/detective-banner.png" alt="" />
              <strong>МОЖНО ЧТО-ТО<br />ПРО РАЗДЕЛЫ</strong>
            </button>
          </div>
        </section>

        <section className="content-section parents-section" id="parents">
          <h1>Родителям</h1>
          <div className="folder-grid">
            <div className="folder-wrap folder-wrap--first">
              <img className="basket-art" src="/assets/basket.png" alt="" />
              <FolderCard title={folders[0].title} onClick={() => openModal({ kind: 'info', title: 'Входной диагностический тест', body: folders[0].description })} />
            </div>
            <FolderCard title={folders[1].title} onClick={() => openModal({ kind: 'info', title: 'Входной диагностический тест', body: folders[1].description })} />
            <FolderCard title={folders[2].title} onClick={() => openModal({ kind: 'info', title: 'Клинические кейсы', body: folders[2].description })} />
          </div>
        </section>

        <section className="content-section glossary-section" id="glossary">
          <h2>Глоссарий <span className="cursor-mark" aria-hidden="true">↖</span></h2>
          <div className="letter-grid" aria-label="Выберите букву глоссария">
            {letters.map((letter) => (
              <button
                className={`letter-button ${selectedLetter === letter ? 'is-selected' : ''}`}
                type="button"
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                aria-pressed={selectedLetter === letter}
              >
                {letter}
              </button>
            ))}
          </div>
          {selectedLetter && (
            <div className="glossary-result">
              <div>
                <span className="glossary-result__letter">{selectedLetter}</span>
                <p>Раздел глоссария на букву «{selectedLetter}»</p>
                <small>Здесь появятся простые объяснения важных терминов и понятий.</small>
              </div>
              <button type="button" onClick={() => setSelectedLetter(null)} aria-label="Скрыть">×</button>
            </div>
          )}
          <div className="cactus-grid">
            <button className="cactus-card" type="button" onClick={() => openModal({ kind: 'info', title: 'Ошибки родителя в начале обучения', body: 'Разбираем частые сомнения и ошибки, которые могут возникать в начале пути. Здесь будет бережная поддержка и практические ориентиры.' })}>
              <img src="/assets/cactus-errors.png" alt="Ошибки родителя в начале обучения" />
            </button>
            <button className="cactus-card" type="button" onClick={() => openModal({ kind: 'info', title: 'Мифы про неговорящих', body: 'Разбираем распространённые мифы о коммуникации, развитии и поддержке неговорящих детей.' })}>
              <img src="/assets/cactus-myths.png" alt="Мифы про неговорящих" />
            </button>
          </div>
        </section>

        <section className="content-section steps-section" id="steps">
          <div className="steps-grid">
            <div className="steps-character" aria-hidden="true"><img src="/assets/detective.png" alt="" /></div>
            <button className="folder-card folder-card--wine" type="button" onClick={() => openModal({ kind: 'info', title: 'Микрошаги к самостоятельности', body: 'Небольшие понятные шаги, которые помогают постепенно поддерживать самостоятельность ребёнка в повседневных делах.' })}>
              <span className="folder-card__tab" />
              <span className="folder-card__face">Микрошаги к<br />самостоятельности</span>
            </button>
            <button className="folder-card folder-card--wine video-card" type="button" onClick={() => openModal({ kind: 'video' })} aria-label="Открыть видео">
              <span className="folder-card__tab" />
              <span className="play-icon" aria-hidden="true"><svg viewBox="0 0 64 72"><path d="M8 5.8c0-4.5 4.9-7.2 8.8-4.9l43 25.3c3.9 2.3 3.9 7.9 0 10.2l-43 25.3C12.9 64 8 61.3 8 56.8V5.8Z" /></svg></span>
            </button>
          </div>
        </section>

        <section className="content-section pricing-section" id="pricing">
          <h2>Тарифы</h2>
          <div className="pricing-grid">
            <article className="price-card">
              <div className="price-card__cover price-card__cover--plain">
                <span className="folder-card__tab" />
                <h3>Знакомство</h3>
              </div>
              <div className="price-card__body">
                <p>Идеально для того, чтобы ознакомиться с форматом и найти для себя первые ответы.</p>
                <ul>
                  <li>Доступ к вводному модулю и базовым памяткам платформы.</li>
                  <li>Участие в одной открытой встрече-знакомстве с куратором и родителями.</li>
                  <li>Доступ в общий чат сезона для навигации и общения.</li>
                  <li>Возможность перейти на основной тариф «Полный ориентир» в любой момент.</li>
                </ul>
                <div className="price-card__footer">
                  <strong>Цена: 0 ₽</strong>
                  <button type="button" onClick={() => openSignup('Знакомство')}>Записаться</button>
                </div>
              </div>
            </article>

            <article className="price-card">
              <div className="price-badge">Методический<br />инструментарий 🌿</div>
              <div className="price-card__cover price-card__cover--full">
                <span className="folder-card__tab" />
                <h3>Полный<br />ориентир</h3>
              </div>
              <div className="price-card__body">
                <p>Для тех, кому нужны видеоинструкции и глубокая поддержка на протяжении всего сезона.</p>
                <ul>
                  <li>Короткие и содержательные уроки, которые можно смотреть в любое время.</li>
                  <li>Все рабочие материалы: шаблоны заявлений, чек-листы и пошаговые алгоритмы действий.</li>
                  <li>Регулярные онлайн-созвоны в малых группах, где можно разобрать вашу конкретную ситуацию.</li>
                  <li>Возможность задать свой вопрос эксперту и получить адресный разбор.</li>
                </ul>
                <div className="price-card__footer">
                  <strong>Цена: 799 ₽</strong>
                  <button type="button" onClick={() => openSignup('Полный ориентир')}>Записаться</button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>«Свой ориентир»</span>
        <a href="#top">Наверх ↑</a>
      </footer>

      {modal && (
        <Modal title={modal.kind === 'signup' ? `Запись на тариф «${modal.plan}»` : modal.kind === 'video' ? 'Видео о сезонном треке' : modal.title} onClose={closeModal}>
          {modal.kind === 'signup' ? (
            formSent ? (
              <div className="success-message">
                <span className="success-message__icon">✓</span>
                <p>Спасибо! Заявка на тариф «{modal.plan}» заполнена.</p>
                <small>Это демонстрационная форма: подключите обработчик заявок, чтобы отправлять данные.</small>
                <button className="primary-button" type="button" onClick={closeModal}>Готово</button>
              </div>
            ) : (
              <form className="signup-form" onSubmit={handleSignup}>
                <p>Оставьте контакты, чтобы команда могла связаться с вами.</p>
                <label>Ваше имя<input name="name" type="text" placeholder="Как к вам обращаться" required /></label>
                <label>Электронная почта<input name="email" type="email" placeholder="name@example.com" required /></label>
                <button className="primary-button" type="submit">Отправить заявку</button>
                <small>Нажимая кнопку, вы соглашаетесь на обработку данных в рамках демонстрации сайта.</small>
              </form>
            )
          ) : modal.kind === 'video' ? (
            <div className="video-placeholder">
              <div className="video-placeholder__play"><svg viewBox="0 0 64 72"><path d="M8 5.8c0-4.5 4.9-7.2 8.8-4.9l43 25.3c3.9 2.3 3.9 7.9 0 10.2l-43 25.3C12.9 64 8 61.3 8 56.8V5.8Z" /></svg></div>
              <p>Добавьте сюда видео о программе или короткую презентацию сезонного трека.</p>
            </div>
          ) : (
            <>
              <p>{modal.body}</p>
              <p className="modal__hint">Материал можно будет открыть в личном кабинете участника.</p>
              <button className="primary-button" type="button" onClick={closeModal}>Понятно</button>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
