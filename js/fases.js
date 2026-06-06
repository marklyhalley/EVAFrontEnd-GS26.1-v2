/* =============================================
   FASES.JS — E.V.A. Global Solution
   Navegação entre fases e URL params
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initFasesTabs();
});

const FASES_DATA = [
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
    descricao: 'Uso de fungos Trichoderma e bactérias extremófilas para reduzir toxicidade e estabilizar o solo.',
    conteudo: [
      'A Fase 1 representa o primeiro contato do sistema E.V.A. com o solo hostil. Nesta etapa crucial, utilizamos uma combinação estratégica de organismos extremófilos especialmente selecionados para suas capacidades únicas de desintoxicação.',
      'Os fungos Trichoderma são os protagonistas desta fase, conhecidos por sua extraordinária capacidade de absorver e metabolizar percloratos - compostos altamente tóxicos que dominam o regolito marciano. Estes fungos não apenas removem os percloratos, mas os convertem em compostos menos nocivos através de processos enzimáticos especializados.',
      'Trabalhando em sinergia, as bactérias extremófilas complementam o trabalho dos fungos, quebrando outros compostos tóxicos e criando um ambiente progressivamente mais hospitaleiro. Estas bactérias foram selecionadas por sua capacidade de sobreviver e prosperar em condições extremas de pH, temperatura e radiação.',
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
    descricao: 'Desenvolvimento da rede de micélio (Pleurotus ostreatus) para aglomerar partículas e reter água.',
    conteudo: [
      'A Fase 2 marca o início da verdadeira transformação estrutural do solo. Com a toxicidade reduzida, introduzimos o Pleurotus ostreatus, uma espécie de fungo com hifas robustas capazes de criar uma rede tridimensional complexa no solo.',
      'Esta rede de micélio funciona como um "sistema nervoso" do solo, conectando partículas dispersas de regolito e criando agregados estáveis. As hifas fúngicas secretam substâncias mucilaginosas que atuam como "cimento biológico", unindo partículas minerais e criando uma estrutura porosa mas coesa.',
      'Um dos benefícios mais notáveis desta fase é o aumento dramático na capacidade de retenção de água - um aumento de 340% comparado ao regolito não tratado. Isto é crucial tanto para Marte quanto para solos degradados na Terra, onde a gestão hídrica é um desafio constante.',
      'Além disso, a rede de micélio cria milhares de canais microscópicos que permitem a circulação de ar e nutrientes, estabelecendo as condições necessárias para que plantas possam eventualmente se estabelecer no solo.',
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
    descricao: 'Simbiose micorrízica com plantas (Glomus/Rhizophagus) para troca de nutrientes e ciclos autossustentáveis.',
    conteudo: [
      'A Fase 3 representa a culminação biológica do sistema E.V.A., onde estabelecemos relações simbióticas entre fungos micorrízicos (Glomus e Rhizophagus) e plantas pioneiras cuidadosamente selecionadas.',
      'Esta simbiose é uma das relações mais antigas e bem-sucedidas da natureza. Os fungos micorrízicos conectam-se intimamente às raízes das plantas, formando estruturas especializadas que permitem a troca eficiente de recursos. As plantas fornecem carboidratos produzidos pela fotossíntese, enquanto os fungos fornecem água e nutrientes minerais.',
      'O impacto é transformador: a área de absorção efetiva das raízes aumenta em até 1000%, permitindo que as plantas prosperem mesmo em condições de baixa disponibilidade de nutrientes. Isto é especialmente crucial em Marte, onde nutrientes orgânicos são essencialmente inexistentes no solo natural.',
      'Com esta fase, estabelecemos um ciclo autossustentável: as plantas produzem matéria orgânica, os fungos a decompõem e reciclam os nutrientes, e o sistema se torna progressivamente mais rico e complexo. É o nascimento de um verdadeiro ecossistema.',
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
    descricao: 'Fungos radiotróficos (Cladosporium sphaerospermum) blindando o ecossistema contra radiação ionizante e frio extremo.',
    conteudo: [
      'A Fase 4 é a camada final de proteção do ecossistema E.V.A., utilizando um dos organismos mais fascinantes da natureza: fungos radiotróficos, especialmente o Cladosporium sphaerospermum.',
      'Descobertos crescendo nas paredes do reator nuclear de Chernobyl, estes fungos possuem uma capacidade extraordinária: converter radiação ionizante em energia química através da melanina em suas células - um processo similar à fotossíntese, mas usando radiação em vez de luz visível.',
      'Em um ambiente marciano, onde a radiação cósmica e UV é uma ameaça constante, esta camada de fungos radiotróficos atua como uma "blindagem biológica viva". A melanina fúngica absorve e dissipa a radiação, protegendo as plantas e organismos do solo abaixo.',
      'Além da proteção radiológica, esta camada fúngica também oferece isolamento térmico, ajudando a estabilizar a temperatura do solo e proteger contra as extremas variações térmicas marcianas. O resultado é um ecossistema robusto, auto-regenerativo e capaz de prosperar em condições que normalmente seriam letais.',
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
  // Verifica URL param ?fase=N
  const params = new URLSearchParams(window.location.search);
  const faseParam = params.get('fase');
  const n = Number(faseParam);
  if (faseParam !== null && Number.isInteger(n) && n >= 0 && n <= 3) {
    activeFase = n;
    // Scroll suave até o detalhe
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
        <div class="icon-box icon-box-md" style="background-color:${fase.color}30; border-radius:0.5rem;">
          <i data-lucide="${fase.icon}" style="width:1.25rem;height:1.25rem;stroke:${fase.color};"></i>
        </div>
        <div class="fase-tab-text">
          <p class="phase-num">Fase ${fase.numero}</p>
          <p class="phase-title">${fase.titulo}</p>
          <div class="fase-mini-progress">
            <div class="fase-mini-track">
              <div class="fase-mini-bar" style="width:${fase.progresso}%;background-color:${fase.color};${fase.progresso > 0 ? 'box-shadow:0 0 6px '+fase.color+'60;' : ''}"></div>
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

  container.style.background = `linear-gradient(135deg, ${fase.bgGradient} 0%, transparent 100%)`;
  container.style.borderColor = fase.borderColor;

  const detalhesHTML = fase.detalhes.map(d => `
    <div style="display:flex;align-items:flex-start;gap:0.75rem;">
      <div style="width:0.375rem;height:0.375rem;border-radius:50%;background-color:${fase.color};flex-shrink:0;margin-top:0.5rem;"></div>
      <p style="font-size:0.875rem;color:rgba(225,245,238,0.7);">${d}</p>
    </div>
  `).join('');

  const conteudoHTML = fase.conteudo.map(p => `<p>${p}</p>`).join('');

  container.innerHTML = `
    <div class="fase-detail-header">
      <div class="fase-detail-title-group">
        <div style="width:4rem;height:4rem;border-radius:0.75rem;background-color:${fase.color}20;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i data-lucide="${fase.icon}" style="width:2rem;height:2rem;stroke:${fase.color};"></i>
        </div>
        <div>
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.25rem;">
            <span class="fase-number" style="color:${fase.color};">${fase.numero}</span>
            <div>
              <h3 class="fase-detail-title">${fase.titulo}</h3>
              <p class="fase-detail-subtitle">${fase.subtitulo}</p>
            </div>
          </div>
        </div>
      </div>
      <span class="chip" style="background-color:${fase.color}20;color:${fase.statusTextColor};">${fase.status}</span>
    </div>

    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem;">
      <div class="progress-track" style="flex:1;">
        <div class="progress-bar" style="width:${fase.progresso}%;background-color:${fase.color};${fase.progresso > 0 ? 'box-shadow:0 0 8px '+fase.color+'60;' : ''}"></div>
      </div>
      <span class="font-mono font-bold" style="color:${fase.color};min-width:2.5rem;text-align:right;">${fase.progresso}%</span>
    </div>

    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div>
        <h4 style="font-size:1.125rem;font-weight:700;color:#fff;margin-bottom:0.75rem;">Visão Geral</h4>
        <p style="color:rgba(225,245,238,0.8);">${fase.descricao}</p>
      </div>

      <div>
        <h4 style="font-size:1.125rem;font-weight:700;color:#fff;margin-bottom:0.75rem;">Descrição Completa</h4>
        <div style="color:rgba(225,245,238,0.8);line-height:1.7;display:flex;flex-direction:column;gap:1rem;">${conteudoHTML}</div>
      </div>

      <div>
        <h4 style="font-size:1.125rem;font-weight:700;color:#fff;margin-bottom:0.75rem;">Características Principais</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;">${detalhesHTML}</div>
      </div>
    </div>
  `;

  lucide.createIcons();
}
