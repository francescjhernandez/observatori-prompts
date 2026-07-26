// --- DICCIONARIO DE TRADUCCIONES ---
const translations = {
  es: {
    header_title: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO",
    repo_title: "Repositorio Abierto de Prompts para Educación",
    repo_description: "Puedes descargar prompts para elaborar con la IA tus programaciones didácticas. Busca los prompts que necesites, sigue sus indicaciones para introducir los datos de tu alumnado, cárgalo en una IA (ChatGPT, Gemini, Kimi, NotebookLM, etc.) y automáticamente se elaborará tu programación didáctica adaptada. Si dispones de prompts contrastados o has mejorado los del portal, apórtalos para que otros docentes puedan utilizarlos.",
    loading: "Cargando catálogo de prompts...",
    no_results: "No se encontraron prompts para la materia seleccionada.",
    copy_btn: "Copiar Prompt",
    copied_btn: "¡Copiado!",
    footer_text: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO © 2026 — Plataforma libre para docentes.",
    
    // Materias
    cat_all: "Todas las materias",
    cat_medio_natural: "Conocimiento del Medio / Ciencias Naturales y Sociales",
    cat_bio_geo: "Biología, Geología y Ciencias Ambientales",
    cat_fis_qui: "Física y Química",
    cat_geo_hist: "Geografía e Historia / Historia del Arte",
    cat_lengua_cast: "Lengua Castellana y Literatura",
    cat_lengua_coof: "Lengua Cooficial (Valenciano / Catalán / Gallego / Euskera)",
    cat_lengua_ext: "Lengua Extranjera (Inglés, Francés, Alemán...)",
    cat_matematicas: "Matemáticas",
    cat_filosofia: "Filosofía y Valores Cívicos",
    cat_ed_fisica: "Educación Física",
    cat_ed_plastica: "Educación Artística, Plástica y Visual",
    cat_musica: "Música y Artes Escénicas",
    cat_tecnologia: "Tecnología, Digitalización e Ingeniería",
    cat_economia: "Economía, Emprendimiento y Empresa",
    cat_clasicas: "Cultura Clásica, Latín y Griego",
    cat_fp: "Formación Profesional (FP)",
    cat_inclusion: "Inclusión, Atención a la Diversidad y Orientación",
    cat_general: "General / Transversal"
  },
  ca: {
    header_title: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU",
    repo_title: "Repositori Obert de Prompts per a Educació",
    repo_description: "Pots descarregar prompts per a elaborar amb la IA les teues programacions didàctiques. Cerca els prompts que necessites, segueix les seues indicacions per a introduir les dades del teu alumnat, carrega'l en una IA (ChatGPT, Gemini, Kimi, NotebookLM, etc.) i automàticament s'elaborarà la teua programació didàctica adaptada. Si disposeu de prompts contrastats o heu millorat aquests del portal, aporta'ls perquè altres docents puguen utilitzar-los.",
    loading: "Carregant catàleg de prompts...",
    no_results: "No s'han trobat prompts per a la matèria seleccionada.",
    copy_btn: "Copiar Prompt",
    copied_btn: "Copiat!",
    footer_text: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU © 2026 — Plataforma meua per a docents.",

    // Materias
    cat_all: "Totes les matèries",
    cat_medio_natural: "Coneixement del Medi / Ciències Naturals i Socials",
    cat_bio_geo: "Biologia, Geologia i Ciències Ambientals",
    cat_fis_qui: "Física i Química",
    cat_geo_hist: "Geografia i Història / Història de l'Art",
    cat_lengua_cast: "Llengua Castellana i Literatura",
    cat_lengua_coof: "Llengua Cooficial (Valencià / Català / Gallec / Euskera)",
    cat_lengua_ext: "Llengua Estrangera (Anglés, Francés, Alemany...)",
    cat_matematicas: "Matemàtiques",
    cat_filosofia: "Filosofia i Valors Cívics",
    cat_ed_fisica: "Educació Física",
    cat_ed_plastica: "Educació Artística, Plàstica i Visual",
    cat_musica: "Música i Arts Escèniques",
    cat_tecnologia: "Tecnologia, Digitalització i Enginyeria",
    cat_economia: "Economia, Emprenedoria i Empresa",
    cat_clasicas: "Cultura Clàssica, Llatí i Grec",
    cat_fp: "Formació Professional (FP)",
    cat_inclusion: "Inclusió, Atenció a la Diversitat i Orientació",
    cat_general: "General / Transversal"
  },
  "pt-BR": {
    header_title: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVA INCLUSIVO",
    repo_title: "Repositório Aberto de Prompts para Educação",
    repo_description: "Você pode baixar prompts para elaborar com a IA seus planos didáticos. Busque os prompts que precisa, siga as instruções para inserir os dados dos seus alunos, carregue em uma IA (ChatGPT, Gemini, Kimi, NotebookLM, etc.) e automaticamente seu plano didático adaptado será elaborado. Se você possui prompts testados ou melhorou os do portal, envie-os para que outros professores possam usá-los.",
    loading: "Carregando catálogo de prompts...",
    no_results: "Nenhum prompt encontrado para a matéria selecionada.",
    copy_btn: "Copiar Prompt",
    copied_btn: "Copiado!",
    footer_text: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVA INCLUSIVO © 2026 — Plataforma livre para professores.",

    // Materias
    cat_all: "Todas as matérias",
    cat_medio_natural: "Estudos do Meio / Ciências Naturais e Sociais",
    cat_bio_geo: "Biologia, Geologia e Ciências Ambientais",
    cat_fis_qui: "Física e Química",
    cat_geo_hist: "Geografia e História / História da Arte",
    cat_lengua_cast: "Língua Espanhola e Literatura",
    cat_lengua_coof: "Línguas Cooficiais / Regionais",
    cat_lengua_ext: "Língua Estrangeira (Inglês, Francês, Alemão...)",
    cat_matematicas: "Matemática",
    cat_filosofia: "Filosofia e Cidadania",
    cat_ed_fisica: "Educação Física",
    cat_ed_plastica: "Educação Artística e Visual",
    cat_musica: "Música e Artes Cênicas",
    cat_tecnologia: "Tecnologia, Digitalização e Engenharia",
    cat_economia: "Economia e Empreendedorismo",
    cat_clasicas: "Cultura Clássica, Latim e Grego",
    cat_fp: "Educação Profissional e Tecnológica (EPT)",
    cat_inclusion: "Inclusão, Atendimento à Diversidade e Orientação",
    cat_general: "Geral / Transversal"
  },
  en: {
    header_title: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT",
    repo_title: "Open Prompt Repository for Education",
    repo_description: "You can download prompts to create your teaching units using AI. Find the prompts you need, follow the instructions to enter your students' data, load it into an AI (ChatGPT, Gemini, Kimi, NotebookLM, etc.), and your adapted teaching unit will be automatically generated. If you have tested prompts or improved those on the portal, feel free to contribute them so other teachers can use them.",
    loading: "Loading prompt catalog...",
    no_results: "No prompts found for the selected subject.",
    copy_btn: "Copy Prompt",
    copied_btn: "Copied!",
    footer_text: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT © 2026 — Free platform for teachers.",

    // Materias
    cat_all: "All subjects",
    cat_medio_natural: "Environmental Studies / Natural and Social Sciences",
    cat_bio_geo: "Biology, Geology, and Environmental Sciences",
    cat_fis_qui: "Physics and Chemistry",
    cat_geo_hist: "Geography and History / Art History",
    cat_lengua_cast: "Spanish Language and Literature",
    cat_lengua_coof: "Co-official / Regional Languages",
    cat_lengua_ext: "Foreign Language (English, French, German...)",
    cat_matematicas: "Mathematics",
    cat_filosofia: "Philosophy and Civic Values",
    cat_ed_fisica: "Physical Education",
    cat_ed_plastica: "Art and Visual Education",
    cat_musica: "Music and Performing Arts",
    cat_tecnologia: "Technology, Digitalization, and Engineering",
    cat_economia: "Economics and Entrepreneurship",
    cat_clasicas: "Classical Culture, Latin, and Greek",
    cat_fp: "Vocational Education and Training (VET)",
    cat_inclusion: "Inclusion, Diversity Support, and Guidance",
    cat_general: "General / Cross-curricular"
  }
};

// --- DATOS DE EJEMPLO DE PROMPTS ---
const promptsData = [
  {
    id: 1,
    subject: "inclusion",
    title: {
      es: "Diseño de Situación de Aprendizaje Inclusiva (DUA)",
      ca: "Disseny de Situació d'Aprenentatge Inclusiva (DUA)",
      "pt-BR": "Design de Situação de Aprendizagem Inclusiva (DUA)",
      en: "Inclusive Learning Situation Design (UDL)"
    },
    content: "Actúa como experto en pedagogía inclusiva. Diseña una situación de aprendizaje adaptada al modelo DUA para el nivel indicado..."
  },
  {
    id: 2,
    subject: "matematicas",
    title: {
      es: "Generador de Problemas de Matemáticas Contextualizados",
      ca: "Generador de Problemes de Matemàtiques Contextualitzats",
      "pt-BR": "Gerador de Problemas de Matemática Contextualizados",
      en: "Contextualized Math Problem Generator"
    },
    content: "Crea 5 problemas matemáticos basados en situaciones reales cotidianas para alumnado de Educación Secundaria..."
  }
];

let currentLang = "es";

// --- CAMBIO DE IDIOMA ---
function setLanguage(lang) {
  currentLang = lang;

  // Actualizar botones activos
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtnId = `btn-${lang.toLowerCase().replace('-br', '')}`;
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  // Traducir elementos estáticos
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Re-renderizar catálogo
  renderPrompts();
}

// --- FILTRADO DE PROMPTS ---
function filterPrompts() {
  renderPrompts();
}

// --- RENDERIZADO DEL CATÁLOGO ---
function renderPrompts() {
  const container = document.getElementById('prompts-container');
  const selectedSubject = document.getElementById('subject-filter').value;

  const filtered = promptsData.filter(item => 
    selectedSubject === 'all' || item.subject === selectedSubject
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="loading-text">${translations[currentLang].no_results}</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article style="background:#fff; padding:1.5rem; border-radius:8px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <h3 style="margin-bottom:0.5rem; color:#0f172a;">${item.title[currentLang] || item.title['es']}</h3>
      <p style="color:#475569; font-size:0.95rem; margin-bottom:1rem; white-space:pre-wrap;">${item.content}</p>
      <button onclick="copyPrompt('${item.id}', this)" style="background:#2563eb; color:#fff; border:none; padding:0.5rem 1rem; border-radius:6px; cursor:pointer; font-weight:500;">
        ${translations[currentLang].copy_btn}
      </button>
    </article>
  `).join('');
}

// --- COPIAR AL PORTAPAPELES ---
function copyPrompt(id, buttonEl) {
  const promptItem = promptsData.find(p => p.id == id);
  if (!promptItem) return;

  navigator.clipboard.writeText(promptItem.content).then(() => {
    const originalText = buttonEl.textContent;
    buttonEl.textContent = translations[currentLang].copied_btn;
    buttonEl.style.background = "#16a34a";
    setTimeout(() => {
      buttonEl.textContent = originalText;
      buttonEl.style.background = "#2563eb";
    }, 2000);
  });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('es');
});