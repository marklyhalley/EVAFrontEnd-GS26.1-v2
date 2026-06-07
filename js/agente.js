document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initTerminal();
  initChat();
});

const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const KNOWLEDGE = [
  { kw:['ola','olá','oi','bom dia','boa tarde','boa noite','hello'],
    res:'Sistema E.V.A. online. Identificando operador... autenticação confirmada.\n\nComo posso auxiliar o monitoramento do ecossistema hoje?' },
  { kw:['ajuda','help','comandos','topicos','tópicos','o que sabe','o que voce','o que você','funcoes'],
    res:'Posso ajudar com:\n• status — visão geral da missão\n• fase 0 a 4 — detalhes de cada etapa\n• ph, umidade, toxicidade, temperatura\n• bioelétrico — sinais da rede micelial\n• fungos — espécies ativas e em standby\n• alertas — anomalias detectadas\n• previsão — análise preditiva 7 dias\n• relatório — resumo completo\n• marte / terra — contexto da missão\n\nDigite em linguagem natural. 🌿' },
  { kw:['status','estado','como esta','como está','situação','situacao','geral','tudo bem'],
    res:'Status geral: NOMINAL ✓\n\n• Fase 2 em andamento — 68% concluída\n• Saúde micelial: 87%\n• Toxicidade por perclorato: 17 ppm (em redução)\n• Atividade bioelétrica: 63 mV\n• Nenhuma anomalia crítica nas últimas 6h\n\nPróximo marco: conclusão da Fase 2 em D+3.' },
  { kw:['fase 0','transporte','dragon','criogenico','criogênico','capsula','cápsula'],
    res:'Fase 0 — Transporte: CONCLUÍDA ✓\n\n• Consórcios fúngicos chegaram viáveis\n• 6 parâmetros monitorados via ESP32 + MQTT\n• Broker HiveMQ Cloud · Tópico: dragon/telemetry/full\n• Temperatura mantida entre 4–25°C durante 7 meses\n\nFase 0 é pré-requisito de toda a missão.' },
  { kw:['fase 1','desintox','perclorato','trichoderma','toxicos','tóxicos'],
    res:'Fase 1 — Desintoxicação: CONCLUÍDA ✓ (D+5)\n\n• Trichoderma spp. reduziu perclorato de 142 ppm → 17 ppm (−88%)\n• Bactérias extremófilas estabilizaram pH em 7.1\n• Solo apto para colonização micelial ✓' },
  { kw:['fase 2','estrutur','pleurotus','micelio','micélio','rede fung','hifas'],
    res:'Fase 2 — Estruturação Micelial: EM ANDAMENTO (68%)\n\n• Pleurotus ostreatus colonizou 12.4 m²\n• Retenção de água: +215% vs. regolito bruto\n• Previsão de conclusão: D+14 (3 dias)' },
  { kw:['fase 3','nutric','micorriza','glomus','rhizophagus','planta','plantas','simbiose'],
    res:'Fase 3 — Nutrição e Regeneração: PLANEJADA (D+15)\n\n• Glomus intraradices e Rhizophagus irregularis em standby\n• Sementes Arabidopsis thaliana em estase criogênica\n• A fase 3 criará ciclos autossustentáveis de nutrientes ♻️' },
  { kw:['fase 4','proteção','protecao','cladosporium','chernobyl','radiossint','radiac','escudo'],
    res:'Fase 4 — Proteção e Estabilidade: PLANEJADA (D+30)\n\n• Cladosporium sphaerospermum nas paredes do dome\n• 20 cm de biomassa → reduz 95% da radiação ionizante\n• Dado validado pela ISS (2020–2022) ✓' },
  { kw:['ph','acidez','alcalin','acido','ácido'],
    res:'pH atual: 7.1 (Neutro) ↑\n\n• Tendência: +0.1/h (crescente)\n• Faixa ideal para Fase 2: 5.5 – 7.5 ✓\n• Status: NORMAL — nenhuma intervenção necessária.' },
  { kw:['umidade','agua','água','hidrat','seco','nevoa','névoa'],
    res:'Umidade do micélio: 68% — ESTÁVEL\n\n• Faixa crítica mínima: 35%\n• ⚠️ Alerta: setor C com 31% (abaixo do ideal)\n• Sistema de névoa ultrassônica: 40% capacidade\n\nAção sugerida: +15% névoa no setor C por 2h.' },
  { kw:['toxicidade','toxico','tóxico','veneno','contaminac'],
    res:'Toxicidade por perclorato: 17 ppm\n\n• Redução de 12% nas últimas 12h\n• Limiar de risco: 50 ppm\n• Trichoderma spp. em metabolização ativa\n\nStatus: EM REDUÇÃO CONTROLADA ✓' },
  { kw:['temperatura','frio','calor','termic','térmic','graus'],
    res:'Temperatura interna do dome: 18.5°C ✓\n\n• Temperatura externa (Marte): −63°C\n• Sistema de aquecimento: 78% capacidade\n• Faixa de sobrevivência Pleurotus: 5–28°C ✓\n\nStatus: NOMINAL' },
  { kw:['bioelet','bioelét','sinal','eletric','elétric','mv','milivolt','nos','nós'],
    res:'Atividade bioelétrica — 24 nós ativos:\n\n• Média: 63 mV (+8% nas últimas 2h)\n• Mínima: 41 mV — nó E7 (ATENÇÃO)\n• Máxima: 89 mV — nó B3\n\nDiagnóstico: rede saudável em crescimento.' },
  { kw:['saude','saúde','vitalidade','indice','índice','ive'],
    res:'Índice de Vitalidade do Ecossistema (IVE): 87/100\n\n• Saúde micelial: 92/100\n• Capacidade de desintoxicação: 73/100\n• Proteção contra radiação: 65/100\n• Estabilidade térmica: 88/100\n\nTendência geral: ↑ positiva.' },
  { kw:['recomend','sugest','o que fazer','proximo','próximo','devo fazer'],
    res:'Recomendações prioritárias (E.V.A.):\n\n1. 🔵 Aumentar névoa no setor C (stress hídrico)\n2. 🟣 Manter Fase 2 por +72h (estruturação em progresso)\n3. 🟡 Monitorar pico UV previsto em 6h\n4. 🟢 Preparar inóculo Glomus para Fase 3' },
  { kw:['alerta','emergencia','emergência','perigo','critico','crítico','problema','anomalia'],
    res:'Verificando alertas ativos...\n\n✅ Nenhum alerta CRÍTICO\n⚠️ 1 alerta de ATENÇÃO:\n\n   Setor C — stress hídrico\n   Umidade: 31% (mínimo: 35%)\n   Ação: ativar névoa por 2h\n\nSistema monitorando continuamente.' },
  { kw:['radiac','radiação','uv','radiacao','solar','cosm'],
    res:'Nível de radiação no dome: 64 µSv/h ✓\n\n• Status: dentro dos parâmetros\n• Pico solar previsto: +6h\n• Cladosporium (Fase 4) reduzirá 95% da radiação\n• Proteção atual: paredes do dome (parcial)\n\n⚠️ Recomendado: antecipar plantio de Cladosporium.' },
  { kw:['marte','mars','marcian','regolito','hellas','extraterr'],
    res:'Localização: Hellas Planitia, Marte — 22.3°S, 70.7°E\n\n• Regolito: basáltico, pH 8.3 (pré-tratamento)\n• Perclorato inicial: 142 ppm\n• Pressão atm.: 0.006 atm (CO₂ 95%)\n• Temperatura superfície: −63°C\n\nO dome E.V.A. opera como ecossistema isolado.' },
  { kw:['terra','terrestre','solo degradado','agr','cerrado','desertif','brasil'],
    res:'Aplicações terrestres do E.V.A.:\n\n• Recuperação de solos degradados por monocultura\n• Simulação paralela: solo Cerrado brasileiro (pH 4.2)\n• Previsão de recuperação: 45 dias\n• 2 bilhões de hectares degradados no planeta\n\nO mesmo consórcio fúngico adaptado ao pH local.' },
  { kw:['previsao','previsão','predic','quando','quanto tempo','projecao','futuro'],
    res:'Análise preditiva — horizonte 7 dias:\n\n• Fase 2 conclusão: D+3 (alta confiança)\n• pH em D+7: 7.3\n• Toxicidade em D+7: ~9 ppm\n• Atividade bioelétrica: 78 mV\n• P(anomalia crítica): 4.2%\n\nModelo atualizado a cada 30 min.' },
  { kw:['fungos','fungo','especie','espécie','consorcio','consórcio','quais fungos'],
    res:'Consórcio fúngico E.V.A.:\n\n🟠 FASE 2 (ativo):\n• Pleurotus ostreatus — 68% cobertura\n• Rhizopus stolonifer — setores secos\n\n🟣 FASE 3 (standby):\n• Glomus intraradices\n• Rhizophagus irregularis\n\n🔵 FASE 4 (standby):\n• Cladosporium sphaerospermum' },
  { kw:['relatorio','relatório','report','resumo','missao','missão'],
    res:'Relatório de Missão — E.V.A.\n══════════════════════\nDia: D+11 | Local: Hellas Planitia\nFase: 2/4 — Estruturação Micelial\n──────────────────────────────\nSaúde do ecossistema: 87%\nPerclorato: 17 ppm (−88% desde D+0)\nCobertura micelial: 12.4 m²\nNós bioelétricos ativos: 24/24\n──────────────────────────────\nPróximo marco: Fase 3 em D+15\n══════════════════════' },
];

function getEVAResponse(input) {
  const n = norm(input);
  for (const entry of KNOWLEDGE) {
    if (entry.kw.some(k => n.includes(norm(k)))) return entry.res;
  }
  return 'Parâmetro não reconhecido nos módulos ativos.\n\nTente: status, fase 0–4, ph, umidade, toxicidade, fungos, alertas, previsão ou relatório.\nOu digite "ajuda" para ver todos os tópicos. 🌿';
}

let chatIsTyping = false;

function fmtTime() {
  return new Date().toLocaleTimeString('pt-BR');
}

function addChatMsg(role, text) {
  const box = document.getElementById('chat-messages');
  if (!box) return;

  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}`;

  if (role === 'eva') {
    wrap.innerHTML = `
      <div>
        <p class="chat-meta">E.V.A. · ${fmtTime()}</p>
        <div class="chat-bubble chat-bubble-eva">${text.replace(/\n/g,'<br>')}</div>
      </div>`;
  } else {
    wrap.innerHTML = `
      <div>
        <div class="chat-bubble chat-bubble-user">${text.replace(/\n/g,'<br>')}</div>
        <p class="chat-meta" style="text-align:right;margin-top:0.25rem;">${fmtTime()}</p>
      </div>`;
  }
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
}

function showTyping() {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'chat-msg chat-msg-eva';
  el.id = 'typing-indicator';
  el.innerHTML = `
    <div>
      <p class="chat-meta">E.V.A. · analisando...</p>
      <div class="typing-bubble">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>`;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function initChat() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  if (!input || !sendBtn) return;

  addChatMsg('eva', 'Sistema E.V.A. inicializado. Monitoramento ativo em 24 nós.\n\nComo posso auxiliar? Digite "ajuda" para ver os tópicos disponíveis.');

  function handleSend() {
    const text = input.value.trim();
    if (!text || chatIsTyping) return;
    addChatMsg('user', text);
    input.value = '';
    chatIsTyping = true;
    input.disabled = true;
    sendBtn.disabled = true;
    showTyping();
    const delay = 900 + Math.random() * 800;
    setTimeout(() => {
      hideTyping();
      addChatMsg('eva', getEVAResponse(text));
      chatIsTyping = false;
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
      lucide.createIcons();
    }, delay);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  lucide.createIcons();
}

const INITIAL_LOGS = [
  { time:'12:47:32', message:'Sistema inicializado. Conectando à rede de micélio...', type:'info' },
  { time:'12:47:45', message:'Rede fúngica detectada. 24 nós ativos no setor A-C.', type:'success' },
  { time:'12:48:01', message:'Umidade setor C: 31% — próxima do limiar mínimo (35%).', type:'warning' },
  { time:'12:48:15', message:'Perclorato reduzido 0.8 ppm nos últimos 30 min.', type:'success' },
  { time:'12:48:32', message:'Pleurotus ostreatus: hifas expandindo 2.3 mm/h setor B.', type:'success' },
  { time:'12:48:47', message:'Pico de radiação solar previsto em ~6h. Monitorando.', type:'warning' },
];

const LOG_POOL = [
  { msg:'Escaneando 24 nós bioelétricos — todos ativos.',       type:'success' },
  { msg:'pH: 7.1 → 7.2 (+0.1). Tendência ascendente normal.',  type:'info' },
  { msg:'Umidade setor C: 31% — próxima do limiar mínimo.',     type:'warning' },
  { msg:'Perclorato reduzido 0.8 ppm nos últimos 30 min.',      type:'success' },
  { msg:'Atividade bioelétrica: pico de 89 mV no nó B3.',       type:'success' },
  { msg:'Temperatura interna estável: 18.5°C (Δ: −63°C).',     type:'info' },
  { msg:'Radiação UV: 64 µSv/h — dentro dos parâmetros.',       type:'info' },
  { msg:'Rhizopus stolonifer detectado em expansão setor D.',    type:'success' },
  { msg:'Nó E7 com atividade reduzida (41 mV). Analisando.',    type:'warning' },
  { msg:'Micélio atingiu 12.4 m² de cobertura no substrato.',   type:'success' },
  { msg:'Sistema de névoa ultrassônica: 40% capacidade.',        type:'info' },
  { msg:'Análise enzimática: Trichoderma ativo.',                type:'success' },
];

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
    <span class="flex-1 ${getMsgClass(log.type)}">${log.message}</span>
  `;
  return entry;
}

function initTerminal() {
  const terminal = document.getElementById('terminal-body');
  if (!terminal) return;
  INITIAL_LOGS.forEach(log => terminal.appendChild(createLogEntry(log)));
  lucide.createIcons();
  terminal.scrollTop = terminal.scrollHeight;

  setInterval(() => {
    while (terminal.children.length >= 8) terminal.removeChild(terminal.firstChild);
    const pick = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
    terminal.appendChild(createLogEntry({ time: fmtTime(), message: pick.msg, type: pick.type }));
    lucide.createIcons();
    terminal.scrollTop = terminal.scrollHeight;
  }, 4000);
}
