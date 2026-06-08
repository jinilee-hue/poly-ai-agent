/* js/utils.js — Data format utilities + Chart defaults */

/* Flatpickr 커스텀 locale — 요일 한국어 유지, 월 이름 영어 */
const fpLocale = {
  weekdays: {
    shorthand: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    longhand:  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  },
  months: {
    shorthand: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    longhand:  ['January','February','March','April','May','June','July','August','September','October','November','December']
  },
  firstDayOfWeek: 0,
  ordinal: function() { return ''; }
};

const formatNumber = (n) =>
  new Intl.NumberFormat('ko-KR').format(n);

const formatCurrency = (n) =>
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(n);

const formatPercent = (n, digits = 1) =>
  `${n >= 0 ? '+' : ''}${n.toFixed(digits)}%`;

const formatDate = (date) =>
  new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);

const formatRelative = (date) => {
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return '오늘';
  if (days === 1) return '어제';
  return `${days}일 전`;
};

function getChartColors() {
  const s = getComputedStyle(document.documentElement);
  return [1,2,3,4,5,6].map(i => s.getPropertyValue(`--chart-${i}`).trim());
}

const chartColors      = getChartColors;
const chartColorsAlpha = getChartColors;

function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }

/* 테마에 따라 차트 UI 색상 반환 */
function chartThemeColors() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    text:           dark ? '#9CA3AF'                   : '#9CA3AF',
    grid:           dark ? 'rgba(255,255,255,0.06)'    : 'rgba(0,0,0,0.07)',
    tooltipBg:      dark ? '#252525'                   : '#FFFFFF',
    tooltipTitle:   dark ? '#F5F5F5'                   : '#111827',
    tooltipBody:    dark ? '#9CA3AF'                   : '#6B7280',
    tooltipBorder:  dark ? 'rgba(255,255,255,0.10)'    : '#E2E5EA',
    pointBg:        dark ? '#1A1A1A'                   : '#FFFFFF',
    arcBorder:      dark ? 'transparent'               : '#fff',
    arcBorderWidth: dark ? 0                           : 2,
    backdropColor:  dark ? 'transparent'               : 'rgba(255,255,255,0.75)',
  };
}

function setChartDefaults() {
  if (typeof Chart === 'undefined') return;
  const c = chartThemeColors();
  Chart.defaults.font.family = "'Pretendard', 'Inter', -apple-system, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = c.text;
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
  Chart.defaults.plugins.legend.labels.padding = 16;
  Chart.defaults.plugins.tooltip.backgroundColor = c.tooltipBg;
  Chart.defaults.plugins.tooltip.titleColor = c.tooltipTitle;
  Chart.defaults.plugins.tooltip.bodyColor = c.tooltipBody;
  Chart.defaults.plugins.tooltip.borderColor = c.tooltipBorder;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.scale.grid.color = c.grid;
  Chart.defaults.scale.grid.borderDash = [3, 3];
  Chart.defaults.elements.line.tension = 0.35;
  Chart.defaults.elements.point.radius = 3;
  Chart.defaults.elements.point.hoverRadius = 5;
  Chart.defaults.elements.point.backgroundColor = c.pointBg;
  Chart.defaults.elements.point.borderWidth = 2;
  Chart.defaults.elements.arc.borderColor = c.arcBorder;
  Chart.defaults.elements.arc.borderWidth = c.arcBorderWidth;
  Chart.defaults.scale.ticks.backdropColor = c.backdropColor;
  Chart.defaults.datasets.bar.barPercentage = 0.45;
  Chart.defaults.datasets.bar.maxBarThickness = 32;

}

// 선그래프: 왼쪽에서 오른쪽으로 그려지는 애니메이션 (파일 로드 즉시 적용)
if (typeof Chart !== 'undefined') {
  Chart.overrides['line'] = Chart.overrides['line'] || {};
  Chart.overrides['line'].animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: 50,
      from: NaN,
      delay: function(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) return 0;
        ctx.xStarted = true;
        return ctx.index * 50;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: 50,
      from: function(ctx) {
        if (ctx.type !== 'data') return;
        return ctx.index === 0
          ? ctx.chart.scales.y.getPixelForValue(ctx.parsed.y)
          : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
      },
      delay: function(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) return 0;
        ctx.yStarted = true;
        return ctx.index * 50;
      }
    }
  };
}
