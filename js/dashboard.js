/* =============================================
   DASHBOARD.JS — E.V.A. Global Solution
   Timer de missão e gráficos Chart.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initMissionTimer();
  initLineChart();
  initBarChart();
  initFaseRowHovers();
});

/* ---- Timer de Missão ---- */
function initMissionTimer() {
  const MISSION_START = new Date('2026-05-25T00:00:00');

  function update() {
    const now = new Date();
    const diffMs = now.getTime() - MISSION_START.getTime();

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours   = Math.floor(diffMs / (1000 * 60 * 60));
    const dias         = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas        = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos      = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const faseNome  = getFaseNome(dias);
    const faseColor = getFaseColor(dias);

    const elDias    = document.getElementById('timer-dias');
    const elHoras   = document.getElementById('timer-horas');
    const elMin     = document.getElementById('timer-min');
    const elFase    = document.getElementById('mission-fase');
    const elDiaNum  = document.getElementById('mission-dia-num');

    if (elDias)   elDias.textContent   = EVA.padZero(dias);
    if (elHoras)  elHoras.textContent  = EVA.padZero(horas);
    if (elMin)    elMin.textContent    = EVA.padZero(minutos);

    if (elFase) {
      elFase.textContent = faseNome;
      elFase.style.color = faseColor;
    }

    if (elDiaNum) {
      elDiaNum.textContent = dias;
      elDiaNum.style.color = faseColor;
    }
  }

  update();
  setInterval(update, 30000); // atualiza a cada 30s
}

function getFaseNome(dias) {
  if (dias < 5)  return 'Fase 1 — Desintoxicação';
  if (dias < 15) return 'Fase 2 — Estruturação do Solo';
  if (dias < 30) return 'Fase 3 — Nutrição e Regeneração';
  return 'Fase 4 — Proteção e Estabilidade';
}

function getFaseColor(dias) {
  if (dias < 5)  return '#993C1D';
  if (dias < 30) return '#1D9E75';
  return '#533AB7';
}

/* ---- Dados para os gráficos ---- */
const metricsData = {
  labels:      ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
  ph:          [6.2, 6.4, 6.6, 6.8, 7.0, 7.1],
  umidade:     [45,  52,  58,  61,  65,  68],
  radiacao:    [82,  78,  75,  71,  68,  64],
  toxicidade:  [35,  32,  28,  24,  20,  17],
  bioeletrica: [28,  34,  42,  51,  58,  63],
};

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0f1422',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      titleColor: '#E1F5EE',
      bodyColor: '#a0a0a0',
    },
  },
  scales: {
    x: {
      ticks: { color: '#a0a0a0', font: { family: "'Space Mono', monospace", size: 11 } },
      grid:  { color: '#3a3a38' },
    },
    y: {
      ticks: { color: '#a0a0a0', font: { family: "'Space Mono', monospace", size: 11 } },
      grid:  { color: '#3a3a38' },
    },
  },
};

/* ---- Line Chart: Desintoxicação ---- */
function initLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'line',
    data: {
      labels: metricsData.labels,
      datasets: [
        {
          label: 'Toxicidade',
          data: metricsData.toxicidade,
          borderColor: '#993C1D',
          backgroundColor: 'rgba(153,60,29,0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#993C1D',
          tension: 0.4,
        },
        {
          label: 'pH',
          data: metricsData.ph,
          borderColor: '#1D9E75',
          backgroundColor: 'rgba(29,158,117,0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#1D9E75',
          tension: 0.4,
        },
      ],
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          display: true,
          labels: { color: '#a0a0a0', boxWidth: 12 },
        },
      },
    },
  });
}

/* ---- Bar Chart: Rede Fúngica ---- */
function initBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: metricsData.labels,
      datasets: [
        {
          label: 'Bioelétrica (mV)',
          data: metricsData.bioeletrica,
          backgroundColor: '#1D9E75',
          borderRadius: 8,
        },
        {
          label: 'Umidade (%)',
          data: metricsData.umidade,
          backgroundColor: '#533AB7',
          borderRadius: 8,
        },
      ],
    },
    options: {
      ...chartDefaults,
      plugins: {
        ...chartDefaults.plugins,
        legend: {
          display: true,
          labels: { color: '#a0a0a0', boxWidth: 12 },
        },
      },
    },
  });
}

/* ---- Hover dinâmico nas fases ---- */
function initFaseRowHovers() {
  document.querySelectorAll('.fase-row[data-color]').forEach(row => {
    const color = row.dataset.color;
    row.addEventListener('mouseenter', () => {
      row.style.borderColor = color + '40';
    });
    row.addEventListener('mouseleave', () => {
      row.style.borderColor = 'rgba(255,255,255,0.05)';
    });
  });
}
