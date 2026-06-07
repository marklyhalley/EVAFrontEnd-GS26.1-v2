document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initFasesTabs();
});

const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const FASES_DATA = [
  {
    numero: '00',
    titulo: 'Transporte da Carga Biológica',
    subtitulo: 'Pré-Missão · SpaceX Dragon Capsule',
    icon: 'rocket',
    color: '#B87D2A',
    bgGradient: 'rgba(184,125,42,0.08)',
    borderColor: 'rgba(250,199,117,0.35)',
    status: 'Concluído',
    statusTextColor: '#FAC775',
    progresso: 100,
    imagem: '../images/fases/fase0.png',
    imagemAlt: 'Câmaras criogênicas contendo culturas fúngicas luminosas de cor âmbar a bordo de uma nave espacial, com Marte visível ao fundo pela janela',
    descricao: 'Consórcios fúngicos transportados da Terra em câmaras criogênicas com monitoramento IoT contínuo de 6 parâmetros ambientais críticos via ESP32 + MQTT + HiveMQ Cloud.',
    conteudo: [
      'A Fase 0 é a precondição de toda a missão E.V.A.: antes que qualquer fungo possa atuar no solo marciano, ele precisa chegar lá vivo. Os consórcios fúngicos — Trichoderma, Pleurotus, Glomus e Cladosporium — são acondicionados em câmaras criogênicas herméticas e embarcados na cápsula SpaceX Dragon para a viagem de aproximadamente 7 meses até Marte.',
      'Durante todo o trajeto, um sistema de telemetria IoT com ESP32 monitora 6 parâmetros ambientais críticos em tempo real, publicando dados a cada 3 segundos via MQTT (TLS) para o broker HiveMQ Cloud. Quando qualquer parâmetro ultrapassa os limiares de segurança, o sistema aciona alertas visuais (LEDs verde/amarelo/vermelho) e sonoros (buzzer) imediatamente.',
      'Qualquer falha nesta fase compromete toda a missão: sem fungos viáveis, não há desintoxicação, não há estruturação do solo, não há ecossistema marciano. É por isso que o monitoramento contínuo desta fase não é opcional — é a fundação de tudo que vem depois.',
    ],
    detalhes: [
      'Temperatura: 4–25°C para sobrevivência dos esporos fúngicos',
      'Umidade relativa: acima de 30% para evitar dessecação',
      'Pressão atmosférica: 0,9–1,1 atm para integridade das câmaras',
      'Radiação ionizante: abaixo de 10 µSv/h para proteção dos inóculos',
      'Concentração de O₂: acima de 19,5% para aerobiose controlada',
      'Aceleração estrutural: abaixo de 2G para evitar dano mecânico',
    ],
    iotInfo: {
      Hardware: 'ESP32 DevKit V1 + DHT22 + sensores analógicos',
      Protocolo: 'MQTT over TLS (porta 8883)',
      Broker: 'HiveMQ Cloud',
      Tópico: 'dragon/telemetry/full',
      Intervalo: '3 segundos',
    },
  },
  {
    numero: '01',
    titulo: 'Desintoxicação',
    subtitulo: 'Redução de Toxicidade',
    icon: 'flask-conical',
    color: '#993C1D',
    bgGradient: 'rgba(153,60,29,0.1)',
    borderColor: 'rgba(153,60,29,0.5)',
    status: 'Concluído',
    statusTextColor: '#1D9E75',
    progresso: 100,
    imagem: '../images/fases/fase1.png',
    imagemAlt: 'Filamentos de micélio verde bioluminescente atacando e dissolvendo compostos tóxicos de perclorato no regolito marciano escuro',
    descricao: 'Uso de fungos Trichoderma e bactérias extremófilas para reduzir toxicidade e estabilizar o solo.',
    conteudo: [
      'A Fase 1 representa o primeiro contato do sistema E.V.A. com o solo hostil. Nesta etapa crucial, utilizamos uma combinação estratégica de organismos extremófilos especialmente selecionados para suas capacidades únicas de desintoxicação.',
      'Os fungos Trichoderma são os protagonistas desta fase, conhecidos por sua extraordinária capacidade de absorver e metabolizar percloratos - compostos altamente tóxicos que dominam o regolito marciano. Estes fungos não apenas removem os percloratos, mas os convertem em compostos menos nocivos através de processos enzimáticos especializados.',
      'O resultado é impressionante: em apenas 120 horas (5 dias), conseguimos reduzir a toxicidade do solo em 87%, transformando um ambiente letal em um substrato viável para as próximas fases do processo.',
    ],
    detalhes: [
      'Fungos Trichoderma absorvem e metabolizam percloratos',
      'Bactérias extremófilas quebram compostos tóxicos',
      'Redução de toxicidade de 87% em 120 horas',
      'Estabilização do pH entre 6.5-7.2',
      'Preparação do solo para colonização micorrízica',
      'Monitoramento contínuo via sensores IoT',
    ],
  },
  {
    numero: '02',
    titulo: 'Estruturação do Solo',
    subtitulo: 'Rede de Micélio',
    icon: 'network',
    color: '#1D9E75',
    bgGradient: 'rgba(29,158,117,0.1)',
    borderColor: 'rgba(29,158,117,0.5)',
    status: 'Ativo',
    statusTextColor: '#1D9E75',
    progresso: 68,
    imagem: '../images/fases/fase2.png',
    imagemAlt: 'Rede de micélio bioluminescente em verde-azulado formando estrutura tridimensional ramificada no solo escuro do regolito marciano, vista em macro',
    descricao: 'Desenvolvimento da rede de micélio (Pleurotus ostreatus) para aglomerar partículas e reter água.',
    conteudo: [
      'A Fase 2 marca o início da verdadeira transformação estrutural do solo. Com a toxicidade reduzida, introduzimos o Pleurotus ostreatus, uma espécie de fungo com hifas robustas capazes de criar uma rede tridimensional complexa no solo.',
      'Esta rede de micélio funciona como um "sistema nervoso" do solo, conectando partículas dispersas de regolito e criando agregados estáveis. As hifas fúngicas secretam substâncias mucilaginosas que atuam como "cimento biológico", unindo partículas minerais e criando uma estrutura porosa mas coesa.',
      'Um dos benefícios mais notáveis desta fase é o aumento dramático na capacidade de retenção de água - um aumento de 340% comparado ao regolito não tratado.',
    ],
    detalhes: [
      'Micélio cria rede tridimensional no solo',
      'Aglomeração de partículas de regolito',
      'Retenção de água aumentada em 340%',
      'Criação de canais para circulação de ar e nutrientes',
      'Estabelecimento de estrutura física estável',
      'Base para simbiose com plantas na Fase 3',
    ],
  },
  {
    numero: '03',
    titulo: 'Nutrição e Regeneração',
    subtitulo: 'Simbiose Micorrízica',
    icon: 'sprout',
    color: '#1D9E75',
    bgGradient: 'rgba(29,158,117,0.1)',
    borderColor: 'rgba(29,158,117,0.5)',
    status: 'Ativo',
    statusTextColor: '#1D9E75',
    progresso: 22,
    imagem: '../images/fases/fase3.png',
    imagemAlt: 'Três mudas com raízes translúcidas emergindo do solo marciano dentro de um dome, conectadas por rede micelial micorrízica dourada bioluminescente visível abaixo da superfície',
    descricao: 'Simbiose micorrízica com plantas (Glomus/Rhizophagus) para troca de nutrientes e ciclos autossustentáveis.',
    conteudo: [
      'A Fase 3 representa a culminação biológica do sistema E.V.A., onde estabelecemos relações simbióticas entre fungos micorrízicos (Glomus e Rhizophagus) e plantas pioneiras cuidadosamente selecionadas.',
      'Esta simbiose é uma das relações mais antigas e bem-sucedidas da natureza. Os fungos micorrízicos conectam-se intimamente às raízes das plantas, formando estruturas especializadas que permitem a troca eficiente de recursos.',
      'O impacto é transformador: a área de absorção efetiva das raízes aumenta em até 1000%, criando um ciclo autossustentável onde plantas produzem matéria orgânica e os fungos a decompõem e reciclam os nutrientes.',
    ],
    detalhes: [
      'Fungos micorrízicos conectam-se às raízes das plantas',
      'Troca simbiótica: carbono por nutrientes minerais',
      'Expansão da área de absorção das raízes em 1000%',
      'Ciclo autossustentável de nutrientes estabelecido',
      'Introdução de plantas pioneiras adaptadas',
      'Início da produção de matéria orgânica no solo',
    ],
  },
  {
    numero: '04',
    titulo: 'Proteção e Estabilidade',
    subtitulo: 'Blindagem Radiológica',
    icon: 'shield',
    color: '#533AB7',
    bgGradient: 'rgba(83,58,183,0.1)',
    borderColor: 'rgba(83,58,183,0.5)',
    status: 'Planejado',
    statusTextColor: '#FAC775',
    progresso: 0,
    imagem: '../images/fases/fase4.png',
    imagemAlt: 'Biomassa fúngica escura de Cladosporium revestindo a parede curva do dome marciano, absorvendo radiação ionizante representada por raios roxos enquanto pontos verdes bioluminescentes indicam o processo de radiosíntese',
    descricao: 'Fungos radiotróficos (Cladosporium sphaerospermum) blindando o ecossistema contra radiação ionizante e frio extremo.',
    conteudo: [
      'A Fase 4 é a camada final de proteção do ecossistema E.V.A., utilizando um dos organismos mais fascinantes da natureza: fungos radiotróficos, especialmente o Cladosporium sphaerospermum.',
      'Descobertos crescendo nas paredes do reator nuclear de Chernobyl, estes fungos possuem uma capacidade extraordinária: converter radiação ionizante em energia química através da melanina em suas células — um processo similar à fotossíntese, mas usando radiação em vez de luz visível.',
      'No Dome E.V.A., atuam como uma blindagem biológica viva contra radiação cósmica e UV marcianas, enquanto oferecem isolamento térmico e estabilização do ecossistema para colonização de longo prazo.',
    ],
    detalhes: [
      'Fungos radiotróficos convertem radiação em energia',
      'Melanina fúngica absorve radiação UV e cósmica',
      'Proteção térmica contra temperaturas extremas',
      'Camada biológica de blindagem auto-regenerativa',
      'Estabilização de longo prazo do ecossistema',
      'Monitoramento de radiação em tempo real',
    ],
  },
];

let activeFase = 0;

function initFasesTabs() {
  const params = new URLSearchParams(window.location.search);
  const faseParam = params.get('fase');
  const n = Number(faseParam);
  if (faseParam !== null && Number.isInteger(n) && n >= 0 && n <= 4) {
    activeFase = n;
    setTimeout(() => {
      const detail = document.getElementById('fase-detail');
      if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
  renderTabs();
  renderDetail();
}

function renderTabs() {
  const container = document.getElementById('fases-tabs');
  if (!container) return;
  container.innerHTML = '';

  FASES_DATA.forEach((fase, index) => {
    const btn = document.createElement('button');
    btn.className = 'fase-tab-btn' + (index === activeFase ? ' active' : '');
    btn.setAttribute('aria-pressed', index === activeFase);
    btn.setAttribute('aria-label', `Fase ${fase.numero}: ${fase.titulo}`);
    if (index === activeFase) {
      btn.style.borderColor = fase.color;
      btn.style.backgroundColor = fase.color + '15';
    }
    btn.innerHTML = `
      <div class="fase-tab-inner">
        <div class="icon-box icon-box-md" style="background-color:${fase.color}30;border-radius:0.5rem;">
          <i data-lucide="${fase.icon}" style="width:1.25rem;height:1.25rem;stroke:${fase.color};"></i>
        </div>
        <div class="fase-tab-text">
          <p class="phase-num">Fase ${fase.numero}</p>
          <p class="phase-title">${fase.titulo}</p>
          <div class="fase-mini-progress">
            <div class="fase-mini-track">
              <div class="fase-mini-bar" style="width:${fase.progresso}%;background-color:${fase.color};${fase.progresso>0?'box-shadow:0 0 6px '+fase.color+'60;':''}"></div>
            </div>
            <span class="fase-mini-pct font-mono" style="color:${fase.color};">${fase.progresso}%</span>
          </div>
        </div>
      </div>
    `;
    btn.addEventListener('click', () => {
      activeFase = index;
      renderTabs();
      renderDetail();
      lucide.createIcons();
    });
    container.appendChild(btn);
  });
  lucide.createIcons();
}

function renderDetail() {
  const container = document.getElementById('fase-detail');
  if (!container) return;
  const fase = FASES_DATA[activeFase];

  container.style.background   = `linear-gradient(135deg, ${fase.bgGradient} 0%, transparent 100%)`;
  container.style.borderColor  = fase.borderColor;

  const imgHtml = fase.imagem ? `
    <div class="fase-hero-img">
      <img src="${fase.imagem}" alt="${fase.imagemAlt || ''}" loading="lazy" />
    </div>` : '';

  const detalhesHTML = fase.detalhes.map(d => `
    <div class="fase-detalhe-item">
      <div class="fase-detalhe-dot" style="background-color:${fase.color};"></div>
      <p class="fase-detalhe-text">${d}</p>
    </div>`).join('');

  const conteudoHTML = fase.conteudo.map(p => `<p>${p}</p>`).join('');

  const iotHtml = fase.iotInfo ? `
    <div class="iot-info-block">
      <div class="iot-info-label">// Sistema de Telemetria IoT — Edge Computing</div>
      ${Object.entries(fase.iotInfo).map(([k,v]) => `
        <div class="iot-info-row">
          <span class="iot-info-key">${k}:</span>
          <span class="iot-info-val">${v}</span>
        </div>`).join('')}
      <p class="iot-info-note">
        Entrega vinculada à disciplina de <strong style="color:#FAC775">Edge Computing &amp; Computer Systems</strong>
        — simulação disponível no Wokwi com ESP32 e sensores analógicos.
      </p>
    </div>` : '';

  container.innerHTML = `
    ${imgHtml}
    <div class="fase-detail-header">
      <div class="fase-detail-title-group">
        <div class="fase-icon-box" style="background-color:${fase.color}20;">
          <i data-lucide="${fase.icon}" style="width:2rem;height:2rem;stroke:${fase.color};"></i>
        </div>
        <div>
          <div class="fase-title-inner">
            <span class="fase-number" style="color:${fase.color};">${fase.numero}</span>
            <div>
              <h3 class="fase-detail-title">${fase.titulo}</h3>
              <p class="fase-detail-subtitle">${fase.subtitulo}</p>
            </div>
          </div>
        </div>
      </div>
      <span class="chip fase-status-chip" style="background-color:${fase.color}20;color:${fase.statusTextColor};">${fase.status}</span>
    </div>

    <div class="fase-progress-row">
      <div class="progress-track" style="flex:1;">
        <div class="progress-bar" style="width:${fase.progresso}%;background-color:${fase.color};${fase.progresso>0?'box-shadow:0 0 8px '+fase.color+'60;':''}"></div>
      </div>
      <span class="font-mono font-bold fase-progress-pct" style="color:${fase.color};">${fase.progresso}%</span>
    </div>

    <div class="fase-body">
      <div>
        <h4 class="fase-section-title">Visão Geral</h4>
        <p class="fase-text">${fase.descricao}</p>
      </div>
      <div>
        <h4 class="fase-section-title">Descrição Completa</h4>
        <div class="fase-conteudo">${conteudoHTML}</div>
      </div>
      <div>
        <h4 class="fase-section-title">${fase.iotInfo ? 'Parâmetros Monitorados pelo IoT' : 'Características Principais'}</h4>
        <div class="fase-car-grid">${detalhesHTML}</div>
      </div>
      ${iotHtml}
    </div>
  `;
  lucide.createIcons();
}
