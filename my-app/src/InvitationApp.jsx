import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { invitation, memories } from './config'
import { useCountdown } from './hooks/useCountdown'
import { useReducedMotion } from './hooks/useReducedMotion'
import './index.css'
import './invitation.css'
import './envelope.css'

const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#fbbf24', '#10b981', '#f43f5e', '#38bdf8']
  })
}

function EnvelopeIntro({ status, setStatus, visible, setVisible }) {
  const reduced = useReducedMotion()
  const timers = useRef([])

  useEffect(() => {
    document.body.classList.toggle('locked', visible)
    return () => document.body.classList.remove('locked')
  }, [visible])

  useEffect(() => {
    return () => timers.current.forEach(window.clearTimeout)
  }, [])

  const close = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setVisible(false)
    setStatus('closed')
  }

  const start = () => {
    if (status === 'opening') return
    if (reduced) return close()

    setStatus('opening')
    
    // Shoot confetti when envelope opens
    window.setTimeout(() => {
      triggerConfetti()
    }, 600)

    timers.current = [
      window.setTimeout(() => document.querySelector('.intro')?.classList.add('closing'), 1800),
      window.setTimeout(close, 2500),
    ]
  }

  if (!visible) return null

  return (
    <div
      className={`intro ${status === 'opening' ? 'opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Thiệp mời tốt nghiệp"
    >
      <div className="intro-badge">
        <span>🎓</span>
        <span>Lời mời chính thức · 2026</span>
      </div>

      <div className="envelope-stage">
        <div className="envelope-wrapper">
          <button
            type="button"
            className="envbtn"
            aria-label="Chạm để mở thiệp mời"
            onClick={start}
            disabled={status === 'opening'}
          >
            <div className="env-container">
              {/* Back background */}
              <div className="env-back-bg" />

              {/* Slidable Letter inside */}
              <div className="env-letter">
                <div className="env-letter-head">
                  <span className="env-letter-tag">INVITATION CARD</span>
                  <span className="env-letter-icon">✨</span>
                </div>
                <div className="env-letter-title">
                  Lễ Tốt Nghiệp
                  <span>Nguyễn Tài Trí</span>
                </div>
                <div className="env-letter-foot">
                  <span>10:00 · 18/11/2026</span>
                  <strong>UTH</strong>
                </div>
              </div>

              {/* Front flap and fold cover */}
              <div className="env-front-cover" />
              <div className="env-flap" />
              
              {/* Wax Seal Stamp */}
              <div className="env-seal">TT</div>
            </div>
          </button>
        </div>
      </div>

      <div className="intro-hint">
        <span className="pulse-dot" />
        <span>{status === 'opening' ? 'Đang mở phong thư...' : 'Chạm vào phong thư để mở'}</span>
      </div>

      <button type="button" className="intro-skip" onClick={close}>
        Bỏ qua hoạt ảnh →
      </button>
    </div>
  )
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle-btn"
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Chuyển giao diện sáng/tối"
      title="Chuyển đổi sáng/tối"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

function Hero({ onReplay }) {
  return (
    <header className="hero-section section-shell" id="top">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot" />
            <span>graduation_ceremony.status = 200</span>
          </div>
          
          <h1 className="hero-title">
            Nguyễn <br />
            <span className="gradient-text">Tài Trí</span>
          </h1>

          <p className="hero-lead">
            Trân trọng kính mời bạn đến chung vui và ghi lại khoảnh khắc đáng nhớ trong ngày lễ tốt nghiệp đại học của mình.
          </p>

          <div className="code-card">
            <div className="code-card-header">
              <div className="window-dots">
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              <small>graduate_profile.ts</small>
            </div>
            <div className="code-card-body">
              <span className="syn-keyword">const</span> <span className="syn-var">engineer</span> = &#123;<br />
              &nbsp;&nbsp;name: <span className="syn-string">"{invitation.graduate}"</span>,<br />
              &nbsp;&nbsp;major: <span className="syn-string">"{invitation.major}"</span>,<br />
              &nbsp;&nbsp;school: <span className="syn-string">"UTH TP.HCM"</span>,<br />
              &nbsp;&nbsp;status: <span className="syn-string">"Ready for new horizons 🚀"</span><br />
              &#125;;
            </div>
          </div>
        </div>

        <div className="hero-portrait-wrapper">
          <div className="portrait-container">
            <div className="portrait-scan-line" />
            <img
              className="portrait-img"
              src="/src/assets/portrait.jpg"
              alt="Chân dung Nguyễn Tài Trí"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="portrait-fallback-icon">🎓</div>
            <h3>{invitation.graduate}</h3>
            <p>{invitation.major}</p>
          </div>

          <div className="hero-actions">
            <button className="btn-replay" type="button" onClick={onReplay}>
              <span>✉️</span> Mở lại phong thư
            </button>
            <button 
              className="btn-replay" 
              type="button" 
              onClick={() => {
                triggerConfetti()
              }}
              title="Tung hoa giấy chúc mừng!"
            >
              <span>🎉</span> Chúc mừng!
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function EventInfo() {
  return (
    <section className="section-block section-shell" id="event">
      <span className="section-tag">01 // Event Schedule</span>
      <h2 className="section-title">
        Thời gian & <em>Địa điểm</em>
      </h2>

      <div className="event-cards-grid">
        <article className="event-card">
          <div className="card-top">
            <span className="card-badge">THỜI GIAN</span>
            <span className="card-icon">⏰</span>
          </div>
          <div className="event-card-value">10:00</div>
          <div className="event-card-desc">
            Thứ Tư, ngày 18 tháng 11 năm 2026
            <span className="event-card-sub">Giờ Việt Nam (GMT+7)</span>
          </div>
        </article>

        <article className="event-card">
          <div className="card-top">
            <span className="card-badge">ĐỊA ĐIỂM</span>
            <span className="card-icon">📍</span>
          </div>
          <div className="event-card-value" style={{ fontSize: '28px', lineHeight: 1.2 }}>
            {invitation.venue}
          </div>
          <div className="event-card-desc">
            {invitation.address}
            <span className="event-card-sub">Trường ĐH Giao thông vận tải TP.HCM</span>
          </div>
        </article>
      </div>
    </section>
  )
}

function Countdown() {
  const time = useCountdown(invitation.targetDate)

  return (
    <section className="section-block section-shell">
      <div className="countdown-box">
        <span className="section-tag" style={{ color: 'var(--accent-light)' }}>
          ⏱️ Cột mốc đang đến gần
        </span>
        <h2 className="countdown-title">
          {time.total > 0 ? 'Đếm ngược đến giờ vàng' : 'Chào mừng bạn đã đến tham dự!'}
        </h2>

        {time.total > 0 && (
          <div className="countdown-timer">
            <div className="countdown-segment">
              <span className="countdown-num">{String(time.days).padStart(2, '0')}</span>
              <span className="countdown-lbl">Ngày</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-segment">
              <span className="countdown-num">{String(time.hours).padStart(2, '0')}</span>
              <span className="countdown-lbl">Giờ</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-segment">
              <span className="countdown-num">{String(time.minutes).padStart(2, '0')}</span>
              <span className="countdown-lbl">Phút</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-segment">
              <span className="countdown-num">{String(time.seconds).padStart(2, '0')}</span>
              <span className="countdown-lbl">Giây</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function MapSection() {
  return (
    <section className="section-block section-shell" id="map">
      <span className="section-tag">02 // Navigation</span>
      <h2 className="section-title">
        Chỉ dẫn <em>đường đi</em>
      </h2>

      <div className="map-grid">
        <div className="map-info">
          <p>
            Buổi lễ sẽ diễn ra tại khuôn viên trường. Rất mong được đón tiếp bạn và cùng chụp những tấm ảnh lưu niệm tuyệt đẹp!
          </p>
          <a
            className="btn-primary"
            href={invitation.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>🗺️</span> Mở Google Maps Chỉ Đường
          </a>
        </div>

        <div className="map-frame-wrapper">
          <iframe
            src={invitation.mapEmbed}
            title="Bản đồ đến Trường Đại học Giao thông vận tải TP.HCM"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}

function Lightbox({ active, index, setIndex, close }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setIndex((index + 1) % memories.length)
      if (e.key === 'ArrowLeft') setIndex((index - 1 + memories.length) % memories.length)
    }

    if (active) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, index, setIndex])

  if (!active) return null
  const item = memories[index]

  return (
    <div className="lightbox-overlay" onClick={close} role="dialog" aria-modal="true">
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" type="button" onClick={close} aria-label="Đóng">
          ✕
        </button>

        <div className="lightbox-img-wrap">
          <img
            src={item.src}
            alt={item.alt}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="gallery-placeholder">
            <span>📷</span>
            {item.alt}
          </div>
        </div>

        <p className="lightbox-caption">{item.caption}</p>
      </div>
    </div>
  )
}

function MemoryGallery() {
  const [active, setActive] = useState(null)

  return (
    <section className="section-block section-shell" id="memories">
      <span className="section-tag">03 // Memories</span>
      <h2 className="section-title">
        Khoảnh khắc <em>thời sinh viên</em>
      </h2>

      <div className="gallery-grid">
        {memories.map((item, index) => (
          <div
            className="gallery-card"
            key={item.src}
            onClick={() => setActive(index)}
          >
            <div className="gallery-photo-frame">
              <img
                className="gallery-img"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div className="gallery-placeholder">
                <span>📸</span>
                {item.alt}
              </div>
            </div>
            <p className="gallery-caption">{item.caption}</p>
          </div>
        ))}
      </div>

      <Lightbox
        active={active !== null}
        index={active || 0}
        setIndex={setActive}
        close={() => setActive(null)}
      />
    </section>
  )
}

function Rsvp() {
  const [wishForm, setWishForm] = useState({ name: '', message: '' })
  const [wishes, setWishes] = useState([
    { id: 1, name: 'Người bạn thân', message: 'Chúc mừng Trí tốt nghiệp thật xuất sắc! Chúc chặng đường mới luôn rực rỡ và thành công!' }
  ])
  const [attendance, setAttendance] = useState('')
  const [attendanceName, setAttendanceName] = useState('')

  const addWish = (e) => {
    e.preventDefault()
    if (!wishForm.name || !wishForm.message) return
    setWishes([{ ...wishForm, id: Date.now() }, ...wishes])
    setWishForm({ name: '', message: '' })
    triggerConfetti()
  }

  const deleteWish = (id) => setWishes(wishes.filter((w) => w.id !== id))

  return (
    <section className="section-block section-shell" id="rsvp">
      <span className="section-tag">04 // RSVP & Guestbook</span>
      <h2 className="section-title">
        Gửi lời chúc & <em>Xác nhận tham dự</em>
      </h2>

      <div className="rsvp-grid">
        {/* Guestbook Wishes Panel */}
        <div className="rsvp-box">
          <div className="rsvp-box-header">
            <span>✍️</span>
            <h3>Sổ lưu bút lời chúc</h3>
          </div>

          <form onSubmit={addWish} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="rsvp-input-group">
              <label>Tên của bạn</label>
              <input
                value={wishForm.name}
                onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                placeholder="Nhập tên bạn..."
                required
              />
            </div>
            <div className="rsvp-input-group">
              <label>Lời nhắn / Lời chúc</label>
              <textarea
                value={wishForm.message}
                onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                placeholder="Gửi lời chúc mừng đến Trí..."
                rows="3"
                required
              />
            </div>
            <button className="btn-primary" type="submit" style={{ justifyContent: 'center' }}>
              <span>🚀</span> Đăng Lời Chúc
            </button>
          </form>

          <div className="wishes-scroll-list">
            {wishes.map((wish) => (
              <div className="wish-bubble" key={wish.id}>
                <div>
                  <strong>{wish.name}</strong>
                  <p>{wish.message}</p>
                </div>
                <button
                  type="button"
                  className="wish-delete-btn"
                  onClick={() => deleteWish(wish.id)}
                  aria-label="Xóa"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Confirmation Panel */}
        <div className="rsvp-box">
          <div className="rsvp-box-header">
            <span>💌</span>
            <h3>Xác nhận tham dự</h3>
          </div>

          <div className="rsvp-input-group">
            <label>Họ và tên của bạn</label>
            <input
              value={attendanceName}
              onChange={(e) => setAttendanceName(e.target.value)}
              placeholder="Nhập họ tên để Trí tiện đón tiếp..."
            />
          </div>

          <div className="attendance-choice-group">
            <button
              type="button"
              className={`attendance-btn ${attendance === 'yes' ? 'active' : ''}`}
              onClick={() => {
                setAttendance('yes')
                triggerConfetti()
              }}
            >
              <span>🎉</span>
              <strong>Sẽ tham dự</strong>
              <small style={{ color: 'var(--text-muted)' }}>Hẹn gặp bạn tại trường!</small>
            </button>

            <button
              type="button"
              className={`attendance-btn ${attendance === 'no' ? 'active' : ''}`}
              onClick={() => setAttendance('no')}
            >
              <span>💐</span>
              <strong>Không thể đến</strong>
              <small style={{ color: 'var(--text-muted)' }}>Hẹn dịp gặp gỡ khác</small>
            </button>
          </div>

          {attendance && (
            <div className="attendance-alert">
              <span>✓</span>
              <span>
                Cảm ơn {attendanceName ? <strong>{attendanceName}</strong> : 'bạn'},{' '}
                {attendance === 'yes'
                  ? 'mình đã ghi nhận bạn sẽ đến chung vui!'
                  : 'mình đã nhận được phản hồi và lời chúc của bạn!'}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <p className="footer-quote">
        "Sự hiện diện của bạn là món quà ý nghĩa nhất cho ngày lễ tốt nghiệp của mình. Cảm ơn vì đã luôn đồng hành cùng Trí trong suốt chặng đường qua!"
      </p>

      <a className="footer-contact-pill" href={`tel:${invitation.phone}`}>
        <span>📞</span> Zalo / Điện thoại: {invitation.phone}
      </a>

      <p className="footer-copyright">
        © 2026 {invitation.graduate} · Graduation Invitation
      </p>
    </footer>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="scroll-progress-bar"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  )
}

export default function InvitationApp() {
  const [status, setStatus] = useState('closed')
  const [introVisible, setIntroVisible] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const replay = () => {
    setStatus('closed')
    setIntroVisible(true)
  }

  return (
    <>
      {/* Background ambient lighting effects */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />

      {/* 3D Envelope Intro */}
      <EnvelopeIntro
        status={status}
        setStatus={setStatus}
        visible={introVisible}
        setVisible={setIntroVisible}
      />

      <ScrollProgress />

      {/* Floating Glass Navigation */}
      <nav className="site-nav section-shell">
        <div className="nav-container">
          <a href="#top" className="nav-brand">
            N.T.T <span className="nav-brand-badge">2026</span>
          </a>
          <ul className="nav-links">
            <li><a href="#event" className="nav-link">Sự kiện</a></li>
            <li><a href="#map" className="nav-link">Bản đồ</a></li>
            <li><a href="#memories" className="nav-link">Kỷ niệm</a></li>
            <li><a href="#rsvp" className="nav-link">RSVP</a></li>
          </ul>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero onReplay={replay} />
        <EventInfo />
        <Countdown />
        <MapSection />
        <MemoryGallery />
        <Rsvp />
      </main>

      <Footer />
    </>
  )
}