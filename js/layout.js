/* js/layout.js — Sidebar & Topbar rendering */

const NAV_ITEMS = [
  { icon: 'home',        label: '대시보드',  href: 'index.html' },
  { icon: 'users',       label: '학생 관리', href: 'students.html' },
  { icon: 'book-open',   label: '수강 관리', href: 'courses.html' },
  { icon: 'cal-check',   label: '출결 관리', href: 'attendance.html' },
  { icon: 'bar-chart',   label: '성적 관리', href: 'grades.html' },
  { icon: 'credit-card', label: '수납 관리', href: 'payments.html' },
  { icon: 'user-check',  label: '강사 관리', href: 'teachers.html' },
  { icon: 'bell',        label: '공지사항',  href: 'notices.html' },
  { icon: 'message',     label: '상담 관리', href: 'counseling.html' },
  { icon: 'settings',    label: '설정',      href: 'settings.html' },
  { icon: 'refresh',     label: '모달 데모', href: 'modal-demo.html' },
];

const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  'cal-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>`,
  'bar-chart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  'credit-card': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  'user-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

/* Apply saved theme immediately to prevent FOUC */
(function () {
  const t = localStorage.getItem('epTheme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

function _syncThemeBtn() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = dark ? ICONS.sun : ICONS.moon;
  btn.title = dark ? '라이트 모드' : '다크 모드';
  btn.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
}

function initLayout(currentHref) {
  const el = document.getElementById('sidebar');
  if (!el) return;

  el.innerHTML = `
    <div class="sidebar-logo">
      <div>
        <span class="sidebar-brand">EduPoly</span>
        <span class="sidebar-tagline">캠퍼스 관리</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${NAV_ITEMS.map(item => `
        <a href="${item.href}" class="nav-item ${currentHref === item.href ? 'active' : ''}">
          ${ICONS[item.icon] || ''}
          <span>${item.label}</span>
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar">이진</div>
        <div>
          <span class="user-name">이진희</span>
          <span class="user-role">관리자</span>
        </div>
      </div>
    </div>
  `;

  /* Breadcrumb: replace topbar-title with home > current page */
  const titleEl = document.querySelector('.topbar-title');
  if (titleEl) {
    const currentItem = NAV_ITEMS.find(item => item.href === currentHref);
    const label = currentItem ? currentItem.label : titleEl.textContent.trim();
    const isHome = currentHref === 'index.html';
    titleEl.outerHTML = isHome
      ? `<span class="breadcrumb-current">${label}</span>`
      : `<nav class="breadcrumb" aria-label="breadcrumb">
          <a href="index.html" class="breadcrumb-home" title="대시보드">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </a>
          <span class="breadcrumb-sep">›</span>
          <span class="breadcrumb-current">${label}</span>
        </nav>`;
  }

  /* Inject theme toggle button into topbar */
  const actions = document.querySelector('.topbar-actions');
  if (actions) {
    const btn = document.createElement('button');
    btn.className = 'icon-btn';
    btn.id = 'theme-toggle';
    btn.addEventListener('click', function () {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('epTheme', next);
      _syncThemeBtn();

      if (typeof setChartDefaults === 'function') setChartDefaults();
      window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next === 'dark' } }));
    });
    actions.insertBefore(btn, actions.firstChild);
    _syncThemeBtn();
  }
}

function icon(name) {
  return ICONS[name] || '';
}

/* 모달 오버레이 클릭 시 닫기 */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
});

/* ─── CUSTOM SELECT ─────────────────────────── */
function _csWrapSelect(sel) {
  if (sel.dataset.csInit) return;
  sel.dataset.csInit = '1';

  var options = Array.from(sel.options);
  var selectedIdx = sel.selectedIndex;

  var wrap = document.createElement('div');
  wrap.className = 'cs-wrap';

  var trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'cs-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  var labelSpan = document.createElement('span');
  labelSpan.className = 'cs-label';
  labelSpan.textContent = options[selectedIdx] ? options[selectedIdx].text : '';
  sel._csLabel = labelSpan;

  var chevronSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevronSvg.setAttribute('viewBox', '0 0 24 24');
  chevronSvg.setAttribute('fill', 'none');
  chevronSvg.setAttribute('stroke', 'currentColor');
  chevronSvg.setAttribute('stroke-width', '2');
  chevronSvg.setAttribute('stroke-linecap', 'round');
  chevronSvg.setAttribute('stroke-linejoin', 'round');
  chevronSvg.classList.add('cs-chevron');
  var pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  pl.setAttribute('points', '6 9 12 15 18 9');
  chevronSvg.appendChild(pl);

  trigger.appendChild(labelSpan);
  trigger.appendChild(chevronSvg);

  var dropdown = document.createElement('div');
  dropdown.className = 'cs-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown._csTrigger = trigger;
  sel._csDropdown = dropdown;
  document.body.appendChild(dropdown);

  var ul = document.createElement('ul');

  options.forEach(function (opt, i) {
    var li = document.createElement('li');
    li.className = 'cs-option' + (i === selectedIdx ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(i === selectedIdx));
    li.textContent = opt.text;

    li.addEventListener('click', function (e) {
      e.stopPropagation();
      sel.value = opt.value;
      labelSpan.textContent = opt.text;
      ul.querySelectorAll('.cs-option').forEach(function (o) {
        o.classList.remove('selected');
        o.setAttribute('aria-selected', 'false');
      });
      li.classList.add('selected');
      li.setAttribute('aria-selected', 'true');
      closeDropdown();
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    ul.appendChild(li);
  });
  dropdown.appendChild(ul);

  sel.parentNode.insertBefore(wrap, sel);
  wrap.appendChild(trigger);
  sel.style.display = 'none';
  wrap.appendChild(sel);

  /* 가장 긴 옵션 기준 너비 설정
     CSS width:max-content → dropdown.offsetWidth = 실제 최대 콘텐츠 너비
     trigger overhead(48) = padding 12+34 + border 2, dropdown overhead(30) = option-pad 28 + border 2
     → trigger = dropdown.offsetWidth + 18 */
  var _calcDropdownWidth = function() {
    /* position:fixed + overflow:hidden 조합에서 브라우저가 max-content 너비를 잘못 계산하는 버그
       → 측정 중에만 overflow:visible 로 전환해 정확한 intrinsic 너비를 얻고, 고정 px 후 복원 */
    dropdown.style.overflow = 'visible';
    dropdown.style.width = 'max-content';
    var dw = dropdown.offsetWidth;
    var tw = Math.max(dw + 18, 110);
    trigger.style.width = tw + 'px';
    dropdown.style.width = tw + 'px';
    dropdown.style.overflow = '';          // CSS overflow:hidden 복원 (고정 너비엔 무해)
  };
  _calcDropdownWidth();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(_calcDropdownWidth);  // 폰트 로드 완료 후 재측정
  }

  function positionDropdown() {
    var rect = trigger.getBoundingClientRect();
    var dropH = dropdown.scrollHeight || 200;
    dropdown.style.left = rect.left + 'px';
    if (window.innerHeight - rect.bottom - 6 < dropH && rect.top > dropH + 6) {
      dropdown.style.top = (rect.top - dropH - 6) + 'px';
    } else {
      dropdown.style.top = (rect.bottom + 6) + 'px';
    }
  }

  function openDropdown() {
    document.querySelectorAll('.cs-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      if (d._csTrigger) {
        d._csTrigger.classList.remove('open');
        d._csTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    positionDropdown();
    dropdown.classList.add('open');
    trigger.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    trigger.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) closeDropdown();
    else openDropdown();
  });

  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDropdown();
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (dropdown.classList.contains('open')) closeDropdown();
      else openDropdown();
    }
  });

  dropdown.addEventListener('click', function (e) { e.stopPropagation(); });
}

function initCustomSelects() {
  document.querySelectorAll('select.filter-select').forEach(_csWrapSelect);

  if (!window._csClickBound) {
    window._csClickBound = true;
    document.addEventListener('click', function () {
      document.querySelectorAll('.cs-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
        if (d._csTrigger) {
          d._csTrigger.classList.remove('open');
          d._csTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      document.querySelectorAll('.fp-cal-dropdown.open').forEach(function (d) {
        if (d._close) d._close();
        else d.classList.remove('open');
      });
    });
  }
}

/* Flatpickr 월/연도 → 달력 내부 커스텀 드롭다운 */
function _fpCalDropdown(cal, triggerEl, items, onSelect) {
  var dropdown = document.createElement('div');
  dropdown.className = 'fp-cal-dropdown';
  dropdown.setAttribute('role', 'listbox');
  cal.appendChild(dropdown);

  var ul = document.createElement('ul');
  items.forEach(function(item, i) {
    var li = document.createElement('li');
    li.className = 'cs-option' + (item.selected ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.textContent = item.text;
    li.addEventListener('click', function(e) {
      e.stopPropagation();
      ul.querySelectorAll('.cs-option').forEach(function(o) { o.classList.remove('selected'); });
      li.classList.add('selected');
      close();
      onSelect(item.value, i);
    });
    ul.appendChild(li);
  });
  dropdown.appendChild(ul);

  function open() {
    cal.querySelectorAll('.fp-cal-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
    cal.querySelectorAll('.cs-trigger.open, .cs-year-trigger.open').forEach(function(t) { t.classList.remove('open'); t.setAttribute('aria-expanded', 'false'); });
    var headerH = (cal.querySelector('.flatpickr-months') || {}).offsetHeight || 54;
    dropdown.style.top = headerH + 'px';
    dropdown.classList.add('open');
    triggerEl.classList.add('open');
    triggerEl.setAttribute('aria-expanded', 'true');
    setTimeout(function() {
      var sel = dropdown.querySelector('.cs-option.selected');
      if (sel) sel.scrollIntoView({ block: 'center' });
    }, 10);
  }
  function close() {
    dropdown.classList.remove('open');
    dropdown.style.top = '';
    triggerEl.classList.remove('open');
    triggerEl.setAttribute('aria-expanded', 'false');
  }

  triggerEl.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.contains('open') ? close() : open();
  });
  dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

  dropdown._close = close;
  return { dropdown: dropdown, close: close,
    syncSelected: function(matchFn) {
      ul.querySelectorAll('.cs-option').forEach(function(li) {
        li.classList.toggle('selected', matchFn(li.textContent));
      });
    }
  };
}

function initFlatpickrSelects(fp) {
  var cal = fp.calendarContainer;

  /* ① 월 */
  var monthSel = cal.querySelector('.flatpickr-monthDropdown-months');
  if (monthSel && !monthSel.dataset.csInit) {
    monthSel.dataset.csInit = '1';
    var moOptions = Array.from(monthSel.options);
    var moIdx = fp.currentMonth;

    var moTrigger = document.createElement('button');
    moTrigger.type = 'button';
    moTrigger.className = 'cs-trigger fp-mo-trigger';
    moTrigger.setAttribute('aria-haspopup', 'listbox');
    moTrigger.setAttribute('aria-expanded', 'false');
    var moLabel = document.createElement('span');
    moLabel.className = 'cs-label';
    moLabel.textContent = moOptions[moIdx] ? moOptions[moIdx].text : '';
    monthSel._csLabel = moLabel;
    moTrigger.appendChild(moLabel);

    var moCtrl = _fpCalDropdown(cal, moTrigger,
      moOptions.map(function(o, i) { return { text: o.text, value: o.value, selected: i === moIdx }; }),
      function(val) {
        monthSel.value = val;
        var idx = monthSel.selectedIndex;
        moLabel.textContent = moOptions[idx] ? moOptions[idx].text : '';
        monthSel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    );
    monthSel._csDropdown = moCtrl.dropdown;

    /* 월 드롭다운 열리면 < > 숨김, 닫히면 복원 */
    function _syncMoArrows() {
      var open = moCtrl.dropdown.classList.contains('open');
      var pv = cal.querySelector('.flatpickr-prev-month');
      var nx = cal.querySelector('.flatpickr-next-month');
      if (pv) pv.style.visibility = open ? 'hidden' : '';
      if (nx) nx.style.visibility = open ? 'hidden' : '';
    }
    moTrigger.addEventListener('click', _syncMoArrows);
    document.addEventListener('click', _syncMoArrows);

    monthSel.parentNode.insertBefore(moTrigger, monthSel);
    monthSel.style.display = 'none';
  }

  /* ② 연도 — numInputWrapper를 숨기고 .flatpickr-current-month에 직접 추가 */
  var numWrap = cal.querySelector('.numInputWrapper');
  var currentMonthDiv = cal.querySelector('.flatpickr-current-month');
  if (!numWrap || !currentMonthDiv || currentMonthDiv.dataset.csYearInit) return;
  currentMonthDiv.dataset.csYearInit = '1';

  var curY = fp.currentYear;
  var yrPageBase = curY; /* 현재 표시 중인 년도 범위의 중심 */

  var yrTrigger = document.createElement('button');
  yrTrigger.type = 'button';
  yrTrigger.className = 'cs-trigger cs-year-trigger';
  yrTrigger.setAttribute('aria-haspopup', 'listbox');
  yrTrigger.setAttribute('aria-expanded', 'false');
  var yrLabel = document.createElement('span');
  yrLabel.className = 'cs-label';
  yrLabel.textContent = curY + '년';
  currentMonthDiv._csLabel = yrLabel;
  yrTrigger.appendChild(yrLabel);

  function _yrItems(base) {
    var items = [];
    for (var y = base - 10; y <= base + 10; y++) items.push({ text: String(y), value: y, selected: y === fp.currentYear });
    return items;
  }

  var yrCtrl = _fpCalDropdown(cal, yrTrigger, _yrItems(yrPageBase), function(val) {
    yrLabel.textContent = val + '년';
    fp.jumpToDate(new Date(val, fp.currentMonth, 1));
  });
  currentMonthDiv._csDropdown = yrCtrl.dropdown;

  /* 년도 범위 재렌더링 — < > 화살표로 이동 시 호출 */
  function _refreshYrList(newBase) {
    yrPageBase = newBase;
    var ul = yrCtrl.dropdown.querySelector('ul');
    if (!ul) return;
    ul.innerHTML = '';
    _yrItems(newBase).forEach(function(item) {
      var li = document.createElement('li');
      li.className = 'cs-option' + (item.selected ? ' selected' : '');
      li.textContent = item.text;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(item.selected));
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        ul.querySelectorAll('.cs-option').forEach(function(o) { o.classList.remove('selected'); });
        li.classList.add('selected');
        yrCtrl.close();
        yrLabel.textContent = item.value + '년';
        fp.jumpToDate(new Date(item.value, fp.currentMonth, 1));
      });
      ul.appendChild(li);
    });
  }

  /* 달력 prev/next 화살표 — 년도 드롭다운 열려있을 때 범위 이동(4년씩), 닫혀있으면 정상 동작 */
  var prevArr = cal.querySelector('.flatpickr-prev-month');
  var nextArr = cal.querySelector('.flatpickr-next-month');
  function _yrNav(e) {
    if (!yrCtrl.dropdown.classList.contains('open')) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    _refreshYrList(yrPageBase + (e.currentTarget === prevArr ? -4 : 4));
  }
  if (prevArr) prevArr.addEventListener('click', _yrNav, true);
  if (nextArr) nextArr.addEventListener('click', _yrNav, true);

  /* 년도 드롭다운 열릴 때 — 월 드롭다운이 닫히면서 숨겨진 화살표 복원 + 범위 재중앙 */
  yrTrigger.addEventListener('click', function() {
    var pv = cal.querySelector('.flatpickr-prev-month');
    var nx = cal.querySelector('.flatpickr-next-month');
    if (pv) pv.style.visibility = '';
    if (nx) nx.style.visibility = '';
    if (!yrCtrl.dropdown.classList.contains('open')) return;
    if (yrPageBase !== fp.currentYear) {
      yrPageBase = fp.currentYear;
      _refreshYrList(yrPageBase);
    }
  });

  /* 캘린더 내 모든 numInputWrapper(Range 2번째 포함) 숨김 */
  cal.querySelectorAll('.numInputWrapper').forEach(function(nw) { nw.style.display = 'none'; });
  cal.querySelectorAll('.flatpickr-monthDropdown-months').forEach(function(sel) { sel.style.display = 'none'; });
  currentMonthDiv.appendChild(yrTrigger);
  syncFlatpickrMonthLabel(fp);
}

function syncFlatpickrMonthLabel(fp) {
  var cal = fp.calendarContainer;
  /* 월 */
  var monthSel = cal.querySelector('.flatpickr-monthDropdown-months');
  if (monthSel && monthSel._csLabel) {
    var idx = fp.currentMonth;
    monthSel._csLabel.textContent = monthSel.options[idx] ? monthSel.options[idx].text : '';
    if (monthSel._csDropdown) {
      monthSel._csDropdown.querySelectorAll('.cs-option').forEach(function(o, i) {
        o.classList.toggle('selected', i === idx);
        o.setAttribute('aria-selected', String(i === idx));
      });
    }
  }
  /* 연도 */
  var currentMonthDiv = cal.querySelector('.flatpickr-current-month');
  if (currentMonthDiv && currentMonthDiv._csLabel) {
    currentMonthDiv._csLabel.textContent = fp.currentYear + '년';
    if (currentMonthDiv._csDropdown) {
      currentMonthDiv._csDropdown.querySelectorAll('.cs-option').forEach(function(o) {
        var match = parseInt(o.textContent) === fp.currentYear;
        o.classList.toggle('selected', match);
      });
    }
  }
}

/* Flatpickr 달력을 .date-box 바로 아래에 정렬 — 커스텀 셀렉트 드롭다운과 위치 통일 */
function fpPositionBelowBox(fp) {
  setTimeout(function() {
    var box = fp.input.closest ? fp.input.closest('.date-box') : fp.input.parentElement;
    if (!box) return;
    var rect = box.getBoundingClientRect();
    var sY = window.pageYOffset || document.documentElement.scrollTop;
    var sX = window.pageXOffset || document.documentElement.scrollLeft;
    var cal = fp.calendarContainer;
    cal.style.top  = (rect.bottom + sY + 4) + 'px';
    cal.style.left = (rect.left  + sX) + 'px';
  }, 0);
}

/* OverlayScrollbars 초기화 */
document.addEventListener('DOMContentLoaded', function () {
  initCustomSelects();

  if (typeof OverlayScrollbarsGlobal === 'undefined') return;
  var OS = OverlayScrollbarsGlobal.OverlayScrollbars;
  var opts = {
    scrollbars: {
      theme: 'os-theme-poly',
      visibility: 'auto',
      autoHide: 'leave',
      autoHideDelay: 400,
      dragScroll: true,
      clickScroll: true,
    }
  };

  var pc = document.querySelector('.page-content');
  if (pc) OS(pc, opts);

  document.querySelectorAll('.table-wrapper').forEach(function (el) { OS(el, opts); });
  document.querySelectorAll('.modal-body').forEach(function (el) { OS(el, opts); });
});
