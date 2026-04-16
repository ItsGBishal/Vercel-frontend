        // ── STARS ──
        const starsEl = document.getElementById('stars');
        for (let i = 0; i < 120; i++) {
            const s = document.createElement('div');
            s.classList.add('star');
            const size = Math.random() * 2 + 0.5;
            s.style.cssText = `
    width:${size}px;height:${size}px;
    left:${Math.random() * 100}%;top:${Math.random() * 100}%;
    --d:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s;
  `;
            starsEl.appendChild(s);
        }

        // ── TYPING ──
        const roles = ['Full Stack Developer', 'MERN Stack Engineer', 'React.js Developer', 'Node.js Backend Dev'];
        let ri = 0, ci = 0, deleting = false;
        function type() {
            const r = roles[ri];
            document.getElementById('typedText').textContent = deleting ? r.slice(0, ci--) : r.slice(0, ci++);
            if (!deleting && ci > r.length) { deleting = true; setTimeout(type, 1200); return; }
            if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 400); return; }
            setTimeout(type, deleting ? 50 : 90);
        }
        type();

        // ── HAMBURGER ──
        document.getElementById('hamburger').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('open');
        });
        function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }

        // ── SCROLL ANIMATIONS ──
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.12 });
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // ── PROJECTS DATA ──
        const staticProjects = [
            {
                title: 'Real-Time Chat Application',
                description: 'A real-time messaging platform for multiple concurrent users with sub-100ms message delivery, JWT-secured routes, and optimized MongoDB schemas.',
                tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
                category: 'fullstack',
                emoji: '💬',
                bg: 'linear-gradient(135deg,#0d2137,#1a3a5c)',
                github: 'https://github.com/ItsGBishal',
                live: 'https://render.com'
            },
            {
                title: 'Note Taking Application',
                description: 'A full-stack CRUD note management system with a responsive React frontend and Node.js/Express backend with protected routes for authenticated users.',
                tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
                category: 'fullstack',
                emoji: '📝',
                bg: 'linear-gradient(135deg,#0d2137,#1a2d1a)',
                github: 'https://github.com/ItsGBishal',
                live: 'https://vercel.com'
            },
            {
                title: 'E-Commerce UI (Amazon Clone)',
                description: 'A full e-commerce product listing and cart interface using vanilla JavaScript DOM manipulation — no frameworks. Includes dynamic cart state and real-time pricing.',
                tech: ['HTML5', 'CSS3', 'JavaScript'],
                category: 'frontend',
                emoji: '🛒',
                bg: 'linear-gradient(135deg,#2d1a0d,#3d2a0d)',
                github: 'https://github.com/ItsGBishal',
                live: null
            }
        ];

        const grid = document.getElementById('projectsGrid');

        function renderProjects(filter) {
            const filtered = filter === 'all' ? staticProjects : staticProjects.filter(p => p.category === filter);
            grid.innerHTML = filtered.map(p => `
    <div class="project-card fade-in" data-cat="${p.category}">
      <div class="project-card-top" style="background:${p.bg}">
        <span style="font-size:3.5rem;position:relative;z-index:1">${p.emoji}</span>
      </div>
      <div class="project-card-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
        <div class="project-tags">${p.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.github}" target="_blank" class="project-link">
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          ${p.live ? `<a href="${p.live}" target="_blank" class="project-link">🔗 Live Demo</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
            // re-observe new fade-in elements
            document.querySelectorAll('.project-card.fade-in').forEach(el => observer.observe(el));
        }

        // Try fetching from backend, fallback to static
        async function loadProjects(filter = 'all') {
            try {
                const res = await fetch('http://localhost:3000/api/projects');
                if (!res.ok) throw new Error();
                const data = await res.json();
                if (data.length === 0) throw new Error();
                // render from API
                grid.innerHTML = data.map(p => `
      <div class="project-card fade-in">
        <div class="project-card-top" style="background:linear-gradient(135deg,#0d2137,#1a3a5c)">
          <span style="font-size:3rem;position:relative;z-index:1">🚀</span>
        </div>
        <div class="project-card-body">
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.description}</div>
          <div class="project-tags">${(p.techStack || []).map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
          <div class="project-links">
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="project-link">GitHub</a>` : ''}
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
            } catch {
                renderProjects(filter);
            }
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(btn.dataset.filter);
            });
        });

        loadProjects();

        // ── CONTACT FORM ──
        document.getElementById('contactForm').addEventListener('submit', async e => {
            e.preventDefault();
            const btn = e.target.querySelector('.form-submit');
            btn.textContent = 'Sending...';
            try {
                await fetch('http://localhost:3000/api/contact', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: e.target[0].value, email: e.target[1].value, message: e.target[2].value })
                });
            } catch { }
            btn.textContent = '✅ Message Sent!';
            btn.style.background = 'linear-gradient(135deg,#00ff88,#00d97e)';
            setTimeout(() => { btn.textContent = 'Send Message ✦'; btn.style.background = ''; e.target.reset(); }, 3000);
        });

        // ── ACTIVE NAV LINK ON SCROLL ──
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let cur = '';
            sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
            document.querySelectorAll('.nav-links a').forEach(a => {
                a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--cyan)' : '';
            });
        });
