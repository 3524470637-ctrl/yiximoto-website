// Detect WeChat/QQ built-in browser
function isWeChatOrQQ() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('micromessenger') || ua.includes('qq') || ua.includes('wechat');
}

// Show browser tip for WeChat/QQ
function showBrowserTip(message) {
    // Remove existing tip
    const existing = document.getElementById('browser-tip');
    if (existing) existing.remove();
    
    const tip = document.createElement('div');
    tip.id = 'browser-tip';
    tip.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)document.getElementById('browser-tip').remove()">
            <div style="background:#fff;border-radius:16px;padding:32px 24px;max-width:320px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);" onclick="event.stopPropagation()">
                <div style="font-size:48px;margin-bottom:16px;">📱</div>
                <h3 style="font-size:1.1rem;font-weight:700;color:#1e293b;margin-bottom:12px;">请在浏览器中打开</h3>
                <p style="font-size:0.9rem;color:#64748b;line-height:1.6;margin-bottom:20px;">${message}</p>
                <div style="font-size:0.85rem;color:#94a3b8;">点击右上角 <span style="font-size:1.2rem;">⋯</span> 选择"在浏览器打开"</div>
                <button onclick="document.getElementById('browser-tip').remove()" style="margin-top:20px;padding:10px 32px;background:linear-gradient(135deg,#1e5aa8,#00a8e8);color:#fff;border:none;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;">知道了</button>
            </div>
        </div>
    `;
    document.body.appendChild(tip);
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
if (navMenu) {
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Navbar scroll state
const navbar = document.querySelector('.navbar');
if (navbar) {
    const onScroll = () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Smooth Scroll
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        navMenu.classList.remove('active');
    });
});

// Toggle Category Expand/Collapse
function toggleCategory(header) {
    const card = header.closest('.category-card');
    card.classList.toggle('expanded');
}

// Toggle Product Detail
function toggleDetail(btn) {
    const productItem = btn.closest('.product-item');
    const detail = productItem.querySelector('.product-detail');
    const isShowing = detail.classList.contains('show');
    
    // Close all other open details first (optional - accordion style)
    document.querySelectorAll('.product-detail.show').forEach(openDetail => {
        if (openDetail !== detail) {
            openDetail.classList.remove('show');
            const otherBtn = openDetail.closest('.product-item').querySelector('.detail-btn');
            if (otherBtn) otherBtn.textContent = '详情';
        }
    });
    
    detail.classList.toggle('show');
    btn.textContent = isShowing ? '详情' : '收起';
}

// Search Products
const searchInput = document.getElementById('product-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        filterProducts();
    });
}

// Filter Products Function
function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    
    const productItems = document.querySelectorAll('.product-item');
    const categoryCards = document.querySelectorAll('.category-card');
    
    productItems.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        
        const matchesSearch = !searchTerm || name.includes(searchTerm);
        
        if (matchesSearch) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Show/hide categories based on visible products
    categoryCards.forEach(card => {
        const visibleProducts = card.querySelectorAll('.product-item:not(.hidden)');
        if (visibleProducts.length === 0) {
            card.style.display = 'none';
        } else {
            card.style.display = '';
            // Auto-expand if searching
            if (searchTerm) {
                card.classList.add('expanded');
            }
        }
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Form Submit Handler - Redirect to Tencent Survey
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName').value;
        const phone = document.getElementById('formPhone').value;
        const message = document.getElementById('formMessage').value;
        
        // Build survey URL with pre-filled data if needed
        const surveyUrl = 'https://wj.qq.com/s2/26893429/ef09/';
        
        // Open survey in new tab
        window.open(surveyUrl, '_blank');
    });
}

// Video Download Handler for Mobile
const videoDownloadBtn = document.getElementById('videoDownloadBtn');
if (videoDownloadBtn) {
    videoDownloadBtn.addEventListener('click', function(e) {
        const isWechat = /MicroMessenger/i.test(navigator.userAgent);
        const isQQ = /QQ/i.test(navigator.userAgent);
        
        if (isWechat || isQQ) {
            e.preventDefault();
            showBrowserTip('视频文件较大（约50MB），请在浏览器中下载，体验更好。');
            return;
        }
    });
}

// Document Download Handler for Mobile
const docDownloadBtn = document.getElementById('docDownloadBtn');
if (docDownloadBtn) {
    docDownloadBtn.addEventListener('click', function(e) {
        const isWechat = /MicroMessenger/i.test(navigator.userAgent);
        const isQQ = /QQ/i.test(navigator.userAgent);
        
        if (isWechat || isQQ) {
            e.preventDefault();
            showBrowserTip('PDF文件请在浏览器中下载，微信内可能无法正常保存。');
            return;
        }
    });
}

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Add fade-in to cards
const cards = document.querySelectorAll('.scenario-card, .testimonial-card, .cert-item');
cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Smooth reveal for product items
const productItems = document.querySelectorAll('.product-item');
productItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${(index % 5) * 0.08}s`;
    observer.observe(item);
});

// Seamless Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('advantagesTrack');
    if (track) {
        let position = 0;
        let isPaused = false;
        const speed = 1; // pixels per frame
        
        // Calculate the width of one set of items (half of total)
        const trackWidth = track.scrollWidth / 2;
        
        function animate() {
            if (!isPaused) {
                position -= speed;
                
                // Reset position when we've scrolled past the first set
                if (Math.abs(position) >= trackWidth) {
                    position = 0;
                }
                
                track.style.transform = `translateX(${position}px)`;
            }
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        track.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }
});

// ===================== 多语言切换 (i18n) =====================
(function () {
  if (!window.YIXI_I18N) return;
  const I18N = window.YIXI_I18N;

  // 首次应用时，为每个文本节点保存原始中文（快照），之后只从快照翻译
  function ensureSnapshot() {
    if (window.__i18n_snapshot_done) return;
    const texts = [];
    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === 3) {
        const raw = node.nodeValue;
        if (raw && raw.trim()) {
          texts.push(node);
        }
        return;
      }
      if (node.nodeType === 1) {
        const tag = node.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || node.id === 'langSwitcher') return;
        if (node.classList && node.classList.contains('lang-btn')) return;
        Array.from(node.childNodes).forEach(walk);
      }
    };
    walk(document.body);
    texts.forEach((node, i) => {
      node.__orig = node.nodeValue; // 保存原始中文
      node.dataset = node.dataset || {};
      node.parentElement && (node.parentElement.__idx = i);
    });
    window.__i18n_snapshot_done = true;
  }

  function applyLanguage(lang) {
    I18N.current = lang;
    document.documentElement.lang = lang;
    document.body.classList.remove('lang-zh', 'lang-en', 'lang-es');
    document.body.classList.add('lang-' + lang);
    ensureSnapshot();

    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === 3) {
        if (node.__orig !== undefined) {
          node.nodeValue = I18N.translate(node.__orig, lang);
        }
        return;
      }
      if (node.nodeType === 1) {
        const tag = node.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || node.id === 'langSwitcher') return;
        if (node.classList && node.classList.contains('lang-btn')) return;
        Array.from(node.childNodes).forEach(walk);
      }
    };
    walk(document.body);

    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    try { localStorage.setItem('yixi_lang', lang); } catch (e) {}
  }

  const switcher = document.getElementById('langSwitcher');
  const langCurrent = document.getElementById('langCurrent');
  const langMenu = document.getElementById('langMenu');

  // 点击当前按钮：展开/收起下拉
  if (langCurrent && switcher) {
    langCurrent.addEventListener('click', (e) => {
      e.stopPropagation();
      switcher.classList.toggle('open');
      langCurrent.setAttribute('aria-expanded', switcher.classList.contains('open'));
    });
  }

  // 点击选项：切换语言 + 更新当前按钮显示 + 收起
  if (langMenu && switcher) {
    langMenu.addEventListener('click', (e) => {
      const opt = e.target.closest('.lang-option');
      if (!opt) return;
      applyLanguage(opt.dataset.lang);
      // 更新当前按钮文字
      const flag = opt.querySelector('.lang-flag').textContent;
      const name = opt.textContent.replace(flag, '').trim();
      langCurrent.querySelector('.lang-flag').textContent = flag;
      langCurrent.querySelector('.lang-name').textContent = name;
      // 高亮当前选项
      langMenu.querySelectorAll('.lang-option').forEach(o => o.classList.toggle('active', o === opt));
      switcher.classList.remove('open');
      langCurrent.setAttribute('aria-expanded', 'false');
    });
  }

  // 点击外部收起
  document.addEventListener('click', (e) => {
    if (switcher && !switcher.contains(e.target)) {
      switcher.classList.remove('open');
      langCurrent && langCurrent.setAttribute('aria-expanded', 'false');
    }
  });

  let initial = 'zh';
  try { initial = localStorage.getItem('yixi_lang') || 'zh'; } catch (e) {}
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLanguage(initial));
  } else {
    applyLanguage(initial);
  }
})();
