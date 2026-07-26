// URL base del repositorio y configuración de traducciones
const translations = {
  es: {
    page_title: "Observatorio de Igualdad Educativa Inclusivo",
    main_title: "Observatorio de Igualdad Educativa Inclusivo",
    subtitle: "Repositorio abierto de prompts para la elaboración de programaciones didácticas adaptadas e inclusivas mediante Inteligencia Artificial.",
    search_placeholder: "Buscar prompts por palabra clave, materia, nivel...",
    filter_all: "Todos",
    filter_general: "Generales",
    filter_adaptations: "Adaptaciones",
    filter_evaluation: "Evaluación",
    btn_copy: "Copiar Prompt",
    btn_copied: "¡Copiado!",
    modal_close: "Cerrar",
    footer_text: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO © 2026 — Universitat de València"
  },
  ca: {
    page_title: "Observatori d'Igualtat Educativa Inclusiu",
    main_title: "Observatori d'Igualtat Educativa Inclusiu",
    subtitle: "Repositori obert de prompts per a l'elaboració de programacions didàctiques adaptades i inclusives mitjançant Intel·ligència Artificial.",
    search_placeholder: "Cercar prompts per paraula clau, matèria, nivell...",
    filter_all: "Tots",
    filter_general: "Generals",
    filter_adaptations: "Adaptacions",
    filter_evaluation: "Avaluació",
    btn_copy: "Copiar Prompt",
    btn_copied: "Copiat!",
    modal_close: "Tancar",
    footer_text: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU © 2026 — Universitat de València"
  },
  "pt-BR": {
    page_title: "Observatório de Igualdade Educativa Inclusivo",
    main_title: "Observatório de Igualdade Educativa Inclusivo",
    subtitle: "Repositório aberto de prompts para a elaboração de planos didáticos adaptados e inclusivos por meio de Inteligência Artificial.",
    search_placeholder: "Pesquisar prompts por palavra-chave, matéria, nível...",
    filter_all: "Todos",
    filter_general: "Gerais",
    filter_adaptations: "Adaptações",
    filter_evaluation: "Avaliação",
    btn_copy: "Copiar Prompt",
    btn_copied: "Copiado!",
    modal_close: "Fechar",
    footer_text: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVA INCLUSIVO © 2026 — Universitat de València"
  },
  en: {
    page_title: "Inclusive Educational Equality Observatory",
    main_title: "Inclusive Educational Equality Observatory",
    subtitle: "Open repository of prompts for creating adapted and inclusive teaching units using Artificial Intelligence.",
    search_placeholder: "Search prompts by keyword, subject, level...",
    filter_all: "All",
    filter_general: "General",
    filter_adaptations: "Adaptations",
    filter_evaluation: "Evaluation",
    btn_copy: "Copy Prompt",
    btn_copied: "Copied!",
    modal_close: "Close",
    footer_text: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT © 2026 — Universitat de València"
  }
};

let currentLang = 'es';

// Función para cambiar idioma y actualizar interfaz
function setLanguage(lang) {
  if (!translations[lang]) lang = 'es';
  currentLang = lang;

  // Actualizar botones de idioma activos
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtnId = `btn-${lang.toLowerCase().replace('-br', '')}`;
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  // Traducir elementos con atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Traducir placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Actualizar atributo lang en html
  document.documentElement.lang = lang;
}

// Copiar texto al portapapeles
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = translations[currentLang].btn_copied || "¡Copiado!";
    buttonElement.style.backgroundColor = "#16a34a";
    
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.backgroundColor = "";
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
}

// Inicialización al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  // 1. Detectar idioma enviado como parámetro desde uv.es (?lang=ca, ?lang=es, etc.)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');

  if (langParam && translations[langParam]) {
    setLanguage(langParam);
  } else {
    setLanguage('es');
  }

  // 2. Configurar eventos de botones de idioma en la propia web de GitHub
  const btnEs = document.getElementById('btn-es');
  const btnCa = document.getElementById('btn-ca');
  const btnPt = document.getElementById('btn-pt');
  const btnEn = document.getElementById('btn-en');

  if (btnEs) btnEs.addEventListener('click', () => setLanguage('es'));
  if (btnCa) btnCa.addEventListener('click', () => setLanguage('ca'));
  if (btnPt) btnPt.addEventListener('click', () => setLanguage('pt-BR'));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
});

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  setLanguage('es');
});
