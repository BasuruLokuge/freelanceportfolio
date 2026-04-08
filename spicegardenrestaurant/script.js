/* ========================================
   SPICE GARDEN RESTAURANT — script.js
   ======================================== */

/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ─── SCROLL TO TOP ─── */
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) scrollTop.classList.add('visible');
  else scrollTop.classList.remove('visible');
});

/* ─── MENU DATA ─── */
const menuItems = [
  {
    name: 'Sri Lankan Rice & Curry',
    desc: 'Aromatic basmati rice served with 5 authentic curries, papadam, and chutney.',
    price: 'LKR 850',
    cat: 'rice',
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80'
  },
  {
    name: 'Chicken Kottu Roti',
    desc: 'Shredded roti stir-fried with chicken, vegetables, egg, and spices.',
    price: 'LKR 780',
    cat: 'rice',
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&q=80'
  },
  {
    name: 'Egg Hoppers',
    desc: 'Crispy bowl-shaped rice flour pancakes with a fried egg centre.',
    price: 'LKR 320',
    cat: 'breads',
    badge: 'Breakfast',
    img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80'
  },
  {
    name: 'Devilled Prawns',
    desc: 'Jumbo prawns tossed in a fiery Sri Lankan devilled sauce with capsicum.',
    price: 'LKR 1,450',
    cat: 'seafood',
    badge: 'Chef\'s Special',
    img: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80'
  },
  {
    name: 'Fish Ambulthiyal',
    desc: 'Sour fish curry made with goraka and traditional spices from the South.',
    price: 'LKR 1,200',
    cat: 'seafood',
    badge: 'Traditional',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80'
  },
  {
    name: 'String Hoppers',
    desc: 'Delicate steamed rice noodle nests served with coconut sambol and kiri hodi.',
    price: 'LKR 420',
    cat: 'breads',
    badge: 'Morning Special',
    img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=500&q=80'
  },
  {
    name: 'King Coconut Cooler',
    desc: 'Fresh king coconut water served chilled with a hint of lime and mint.',
    price: 'LKR 280',
    cat: 'drinks',
    badge: 'Refreshing',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80'
  },
  {
    name: 'Ceylon Tea Infusion',
    desc: 'Pure Ceylon tea brewed to perfection, served hot or iced with milk.',
    price: 'LKR 180',
    cat: 'drinks',
    badge: 'Classic',
    img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80'
  }
];

function renderMenu(filter) {
  const grid = document.getElementById('menuGrid');
  const items = filter === 'all' ? menuItems : menuItems.filter(i => i.cat === filter);
  grid.innerHTML = items.map(item => `
    <div class="menu-card" data-cat="${item.cat}">
      <div class="menu-card-img" style="background-image:url('${item.img}')">
        <span class="menu-card-badge">${item.badge}</span>
      </div>
      <div class="menu-card-body">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <span class="price">${item.price}</span>
          <button class="add-btn" onclick="addToOrder('${item.name}')">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─── MENU TABS ─── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderMenu(tab.dataset.cat);
  });
});

renderMenu('all');

function addToOrder(name) {
  // Simple toast notification
  showToast(`🛒 "${name}" added to your order!`);
}

function showToast(msg) {
  const existing = document.querySelector('.sg-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'sg-toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%);
    background: #1a1208; color: #fff; padding: .75rem 1.5rem;
    border-radius: 30px; font-size: .9rem; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,.3); z-index: 9999;
    animation: toastIn .3s ease both;
  `;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ─── RESERVATION FORM ─── */
document.getElementById('resForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('resForm').style.display = 'none';
  document.getElementById('resSuccess').style.display = 'block';
  showToast('✅ Reservation confirmed! See you soon!');
});

/* ─── MINI CALENDAR ─── */
(function buildCalendar() {
  const el = document.getElementById('miniCal');
  if (!el) return;

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  const today = now.getDate();
  const bookedDays = [5, 8, 12, 15, 19, 22, 26];

  function render() {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];

    let html = `
      <div class="cal-header">
        <button onclick="calPrev()">‹</button>
        <span>${monthNames[month]} ${year}</span>
        <button onclick="calNext()">›</button>
      </div>
      <div class="cal-grid">
        ${dayNames.map(d => `<div class="cal-day-header">${d}</div>`).join('')}
        ${Array(firstDay).fill('<div class="cal-day empty">0</div>').join('')}
        ${Array.from({length: daysInMonth}, (_,i) => {
          const d = i+1;
          let cls = 'cal-day';
          if (d === today && month === now.getMonth() && year === now.getFullYear()) cls += ' today';
          else if (bookedDays.includes(d)) cls += ' has-booking';
          return `<div class="${cls}">${d}</div>`;
        }).join('')}
      </div>
    `;
    el.innerHTML = html;
  }

  window.calPrev = () => { month--; if (month < 0) { month = 11; year--; } render(); };
  window.calNext = () => { month++; if (month > 11) { month = 0; year++; } render(); };

  render();
})();

/* ─── INTERSECTION OBSERVER — fade-in animations ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.menu-card, .t-card, .d-step, .c-item, .about-stats .stat, .flavor-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

/* ─── SMOOTH SCROLL for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
