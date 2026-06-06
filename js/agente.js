/* =============================================
   AGENTE.JS — E.V.A. Global Solution
   Terminal de logs em tempo real
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initTerminal();
});

const INITIAL_LOGS = [
  { time: '12:47:32', message: 'Sistema inicializado. Conectando à rede de micélio...', type: 'info' },
  { time: '12:47:45', message: 'Rede fúngica detectada. 24 nós ativos no setor A-C.', type: 'success' },
  { time: '12:48:01', message: 'Alteração química detectada no setor B. Analisando...', type: 'warning' },
  { time: '12:48:15', message: 'Diagnóstico: Redução de perclorato em 12%. Status: Positivo.', type: 'success' },
  { time: '12:48:32', message: 'Iniciando liberação de enzimas na Fase 2...', type: 'info' },
  { time: '12:48:47', message: 'Atividade bioelétrica aumentou 8% no setor B.', type: 'success' },
];

const RANDOM_MESSAGES = [
  'Monitorando níveis de umidade no micélio...',
  'Detectado aumento de pH em 0.2 unidades.',
  'Rede fúngica expandindo em direção ao setor D.',
  'Radiação UV dentro dos parâmetros aceitáveis.',
  'Simbiose micorrízica estabelecida com sucesso.',
  'Toxicidade reduzida em mais 3% nas últimas 2 horas.',
];

const LOG_TYPES = ['info', 'success', 'warning'];

function getIconName(type) {
  if (type === 'success') return 'check-circle';
  if (type === 'warning') return 'alert-circle';
  return 'activity';
}

function getMsgClass(type) {
  if (type === 'success') return 'log-msg-success';
  if (type === 'warning') return 'log-msg-warning';
  return 'log-msg-info';
}

function getIconClass(type) {
  if (type === 'success') return 'log-icon-success';
  if (type === 'warning') return 'log-icon-warning';
  return 'log-icon-info';
}

function createLogEntry(log) {
  const entry = document.createElement('div');
  entry.className = 'log-entry animate-fade-in';
  entry.innerHTML = `
    <span class="log-time">[${log.time}]</span>
    <i data-lucide="${getIconName(log.type)}" class="log-icon ${getIconClass(log.type)}"></i>
    <span class="flex-1 ${getMsgClass(log.type)}">[IA Sentinel]: ${log.message}</span>
  `;
  return entry;
}

function initTerminal() {
  const terminal = document.getElementById('terminal-body');
  if (!terminal) return;

  // Renderiza logs iniciais
  INITIAL_LOGS.forEach(log => {
    const entry = createLogEntry(log);
    terminal.appendChild(entry);
  });
  lucide.createIcons();
  terminal.scrollTop = terminal.scrollHeight;

  // Adiciona logs aleatórios a cada 5 segundos
  setInterval(() => {
    // Mantém no máximo 6 entradas visíveis
    while (terminal.children.length >= 6) {
      terminal.removeChild(terminal.firstChild);
    }

    const type = LOG_TYPES[Math.floor(Math.random() * LOG_TYPES.length)];
    const message = RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
    const time = new Date().toLocaleTimeString('pt-BR');

    const entry = createLogEntry({ time, message, type });
    terminal.appendChild(entry);
    lucide.createIcons();
    terminal.scrollTop = terminal.scrollHeight;
  }, 5000);
}
