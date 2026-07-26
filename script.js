// ====================================================================
// CONFIGURACIÓ DE SUPABASE I RUTES
// ====================================================================

// Credencials de Supabase
const SUPABASE_URL = "https://amswkfdhwashotagrhfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// URLs directes als formularis de context en GitHub
const formUrls = {
    ca: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulari_context_docent_ca.txt",
    es: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_es.txt",
    pt: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_pt.txt",
    en: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/teacher_context_form_en.txt"
};

// Diccionari de traduccions de la interfície
const translations = {
    es: {
        page_title: "Observatorio de Igualdad Educativa Inclusivo",
        header_title: "Observatorio de Igualdad Educativa Inclusivo",
        btn_admin: "Administración",
        instructions_title: "PARA USAR LOS PROMPTS DE ESTE REPOSITORIO, DEBES:",
        step_1: "1) Descargar y rellenar el formulario.",
        step_2: "2) Descargar o copiar el prompt.",
        step_3: "3) Introducir el prompt y el formulario en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Si quieres subir un prompt a la plataforma, usa el botón «Administración» y rellena el formulario.",
        btn_download: "📥 Descargar formulario de contexto",
        search_placeholder: "Buscar prompts por palabra clave, materia, nivel...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "¡Prompt copiado al portapapeles con éxito!",
        copy_error: "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente.",
        no_results: "No se han encontrado prompts que coincidan con la búsqueda.",
        admin_panel_title: "Panel de Gestión de Prompts",
        prompt_title_label: "Título del Prompt",
        prompt_cat_label: "Categoría",
        prompt_body_label: "Contenido del Prompt",
        btn_save_prompt: "Guardar Prompt",
        footer_text: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO © 2026 — Universitat de València"
    },
    ca: {
        page_title: "Observatori d'Igualtat Educativa Inclusiu",
        header_title: "Observatori d'Igualtat Educativa Inclusiu",
        btn_admin: "Administració",
        instructions_title: "PER A UTILITZAR ELS PROMPTS D'AQUEST REPOSITORI, HAS DE:",
        step_1: "1) Descarregar i omplir el formulari.",
        step_2: "2) Descarregar o copiar el prompt.",
        step_3: "3) Introduir el prompt i el formulari en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Si vols pujar un prompt a la plataforma, utilitza el botó «Administració» i ompli el formulari.",
        btn_download: "📥 Descarregar formulari de context",
        search_placeholder: "Cercar prompts per paraula clau, matèria, nivell...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "Prompt copiat al porta-retalls amb èxit!",
        copy_error: "No s'ha pogut copiar automàticament. Selecciona el text i copia'l manualment.",
        no_results: "No s'han trobat prompts que coincidisquen amb la cerca.",
        admin_panel_title: "Panell de Gestió de Prompts",
        prompt_title_label: "Títol del Prompt",
        prompt_cat_label: "Categoria",
        prompt_body_label: "Contingut del Prompt",
        btn_save_prompt: "Guardar Prompt",
        footer_text: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU © 2026 — Universitat de València"
    },
    pt: {
        page_title: "Observatório de Igualdade Educativa Inclusivo",
        header_title: "Observatório de Igualdade Educativa Inclusivo",
        btn_admin: "Administração",
        instructions_title: "PARA USAR OS PROMPTS DESTE REPOSITÓRIO, VOCÊ DEVE:",
        step_1: "1) Baixar e preencher o formulário.",
        step_2: "2) Baixar ou copiar o prompt.",
        step_3: "3) Inserir o prompt e o formulário em uma IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Se você quiser enviar um prompt para a plataforma, use o botão «Administração» e preencha o formulário.",
        btn_download: "📥 Baixar formulário de contexto",
        search_placeholder: "Buscar prompts por palavra-chave, matéria, nível...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "Prompt copiado para a área de transferência com sucesso!",
        copy_error: "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.",
        no_results: "Nenhum prompt encontrado com esses termos de busca.",
        admin_panel_title: "Painel de Gestão de Prompts",
        prompt_title_label: "Título do Prompt",
        prompt_cat_label: "Categoria",
        prompt_body_label: "Conteúdo do Prompt",
        btn_save_prompt: "Salvar Prompt",
        footer_text: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVO INCLUSIVO © 2026 — Universitat de València"
    },
    en: {
        page_title: "Inclusive Educational Equality Observatory",
        header_title: "Inclusive Educational Equality Observatory",
        btn_admin: "Administration",
        instructions_title: "TO USE THE PROMPTS IN THIS REPOSITORY, YOU MUST:",
        step_1: "1) Download and fill out the context form.",
        step_2: "2) Download or copy the prompt.",
        step_3: "3) Enter the prompt and the form into an AI (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "If you want to upload a prompt to the platform, click the «Administration» button and complete the form.",
        btn_download: "📥 Download context form",
        search_placeholder: "Search prompts by keyword, subject, level...",
        btn_copy: "📋 Copy Prompt",
        copy_success: "Prompt successfully copied to clipboard!",
        copy_error: "Could not copy automatically. Please select the text and copy it manually.",
        no_results: "No prompts found matching your search.",
        admin_panel_title: "Prompt Management Panel",
        prompt_title_label: "Prompt Title",
        prompt_cat_label: "Category",
        prompt_body_label: "Prompt Content",
        btn_save_prompt: "Save Prompt",
        footer_text: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT © 2026 — Universitat de València"
    }
};

let currentLang = 'ca';
let promptsData = [];

// ====================================================================
// CARREGAR DES DE SUPABASE
// ====================================================================

async function fetchPromptsFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('prompts')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error("Error en carregar de Supabase:", error);
            return;
        }

        if (data && data.length > 0) {
            promptsData = data;
        }
        renderPrompts(promptsData);
    } catch (err) {
        console.error("Excepció en connectar a Supabase:", err);
    }
}

// ====================================================================
// RENDERITZAT I INTERFÍCIE
// ====================================================================

function renderPrompts(promptsToRender) {
    const container = document.getElementById('prompts-container');
    if (!container) return;

    const searchQuery = document.getElementById('search-input')?.value.toLowerCase() || '';

    const filtered = promptsToRender.filter(p => {
        const title = p.title || '';
        const category = p.category || '';
        const body = p.body || '';
        return title.toLowerCase().includes(searchQuery) ||
               category.toLowerCase().includes(searchQuery) ||
               body.toLowerCase().includes(searchQuery);
    });

    if (filtered.length === 0) {
        const noResultsMsg = translations[currentLang]?.no_results || "No results.";
        container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: #64748b;">${noResultsMsg}</p>`;
        return;
    }

    const copyBtnText = translations[currentLang]?.btn_copy || "📋 Copiar Prompt";

    container.innerHTML = filtered.map(prompt => `
        <article class="prompt-card" id="prompt-${prompt.id}">
            <div class="prompt-header">
                <span class="prompt-badge">${escapeHtml(prompt.category)}</span>
                <h3>${escapeHtml(prompt.title)}</h3>
            </div>
            <div class="prompt-body">
                <pre><code>${escapeHtml(prompt.body)}</code></pre>
            </div>
            <div class="prompt-actions">
                <button class="btn-copy" onclick="copyPromptToClipboard(${prompt.id})">
                    ${copyBtnText}
                </button>
            </div>
        </article>
    `).join('');
}

async function copyPromptToClipboard(id) {
    const prompt = promptsData.find(p => p.id === id);
    if (!prompt) return;

    try {
        await navigator.clipboard.writeText(prompt.body);
        alert(translations[currentLang]?.copy_success || "Copiado!");
    } catch (err) {
        console.error("Error en copiar:", err);
        alert(translations[currentLang]?.copy_error || "Error al copiar.");
    }
}

// ====================================================================
// GESTIÓ D'IDIOMES
// ====================================================================

function setLanguage(lang) {
    currentLang = translations[lang] ? lang : 'ca';
    document.documentElement.lang = currentLang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-${currentLang}`);
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    const btnForm = document.getElementById('btn-download-form');
    if (btnForm) {
        btnForm.href = formUrls[currentLang] || formUrls['ca'];
        btnForm.setAttribute('download', `formulari_context_${currentLang}.txt`);
    }

    localStorage.setItem('preferred_lang', currentLang);
    renderPrompts(promptsData);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ====================================================================
// MODAL D'ADMINISTRACIÓ I INSERCIÓ A SUPABASE
// ====================================================================

function setupAdminModal() {
    const adminBtn = document.getElementById('admin-login-btn');
    const modal = document.getElementById('admin-modal');
    const closeBtn = document.getElementById('btn-close-modal');
    const form = document.getElementById('add-prompt-form');

    if (adminBtn && modal) {
        adminBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('new-prompt-title').value;
            const category = document.getElementById('new-prompt-category').value;
            const body = document.getElementById('new-prompt-body').value;

            const newPrompt = { title, category, body };

            const { data, error } = await supabaseClient
                .from('prompts')
                .insert([newPrompt])
                .select();

            if (error) {
                console.error("Error al guardar a Supabase:", error);
                alert("Error al guardar el prompt a la base de dades.");
                return;
            }

            if (data && data.length > 0) {
                promptsData.unshift(data[0]);
                renderPrompts(promptsData);
            }

            form.reset();
            modal.style.display = 'none';
        });
    }
}

// ====================================================================
// INICIALITZACIÓ
// ====================================================================

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const savedLang = localStorage.getItem('preferred_lang');
    const initialLang = langParam || savedLang || 'ca';

    setLanguage(initialLang);
    setupAdminModal();

    document.getElementById('btn-es')?.addEventListener('click', () => setLanguage('es'));
    document.getElementById('btn-ca')?.addEventListener('click', () => setLanguage('ca'));
    document.getElementById('btn-pt')?.addEventListener('click', () => setLanguage('pt'));
    document.getElementById('btn-en')?.addEventListener('click', () => setLanguage('en'));

    document.getElementById('search-input')?.addEventListener('input', () => renderPrompts(promptsData));

    await fetchPromptsFromSupabase();
});
