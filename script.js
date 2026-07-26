// ====================================================================
// CONFIGURACIÓ DE SUPABASE I RUTES
// ====================================================================

const SUPABASE_URL = "https://amswkfdhwashotagrhfo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_J-PhmX7Awpb8UwDYXhYwWg_iISrccBy";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const formUrls = {
    ca: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulari_context_docent_ca.txt",
    es: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_es.txt",
    pt: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/formulario_contexto_docente_pt.txt",
    en: "https://raw.githubusercontent.com/francescjhernandez/observatori-prompts/main/teacher_context_form_en.txt"
};

const translations = {
    es: {
        page_title: "Observatorio de Igualdad Educativa Inclusivo",
        header_title: "Observatorio de Igualdad Educativa Inclusivo",
        btn_admin: "Administración",
        instructions_title: "PARA USAR LOS PROMPTS DE ESTE REPOSITORIO, DEBES:",
        step_1: "Descargar y rellenar el formulario.",
        step_2: "Descargar o copiar el prompt.",
        step_3: "Introducir el prompt y el formulario en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Si quieres subir un prompt a la plataforma, usa el botón «Administración» y rellena el formulario.",
        btn_download: "📥 Descargar formulario de contexto",
        search_placeholder: "Buscar prompts por palabra clave, materia, nivel...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "¡Prompt copiado al portapapeles con éxito!",
        copy_error: "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente.",
        no_results: "No se han encontrado prompts que coincidan con la búsqueda.",
        admin_panel_title: "Panel de Gestión de Prompts",
        prompt_title_label: "Título del Prompt",
        prompt_author_label: "Nombre de la persona que carga el prompt",
        prompt_cat_label: "Categoría / Materia",
        select_category_default: "-- Selecciona una opción --",
        prompt_body_label: "Contenido del Prompt",
        prompt_body_help: "Importante: Copia y pega el prompt estrictamente en texto plano (sin formatos de Word o HTML).",
        btn_cancel: "Cancelar",
        btn_save_prompt: "Guardar Prompt",
        footer_text: "PROYECTO OBSERVATORIO DE IGUALDAD EDUCATIVA INCLUSIVO © 2026 — Universitat de València",
        by_author: "Autor/a:",
        group_transversal: "Ámbitos Transversales y Especiales",
        group_subjects: "Materias y Áreas (LOMLOE y BNCC)",
        group_others: "Otros"
    },
    ca: {
        page_title: "Observatori d'Igualtat Educativa Inclusiu",
        header_title: "Observatori d'Igualtat Educativa Inclusiu",
        btn_admin: "Administració",
        instructions_title: "PER A UTILITZAR ELS PROMPTS D'AQUEST REPOSITORI, HAS DE:",
        step_1: "Descarregar i omplir el formulari.",
        step_2: "Descarregar o copiar el prompt.",
        step_3: "Introduir el prompt i el formulari en una IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Si vols pujar un prompt a la plataforma, utilitza el botó «Administració» i ompli el formulari.",
        btn_download: "📥 Descarregar formulari de context",
        search_placeholder: "Cercar prompts per paraula clau, matèria, nivell...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "Prompt copiat al porta-retalls amb èxit!",
        copy_error: "No s'ha pogut copiar automàticament. Selecciona el text i copia'l manualment.",
        no_results: "No s'han trobat prompts que coincidisquen amb la cerca.",
        admin_panel_title: "Panell de Gestió de Prompts",
        prompt_title_label: "Títol del Prompt",
        prompt_author_label: "Nom de la persona que carregar el prompt",
        prompt_cat_label: "Categoria / Matèria",
        select_category_default: "-- Selecciona una opció --",
        prompt_body_label: "Contingut del Prompt",
        prompt_body_help: "Important: Copia i pega el prompt estrictament en text pla (sense formats de Word o HTML).",
        btn_cancel: "Cancel·lar",
        btn_save_prompt: "Guardar Prompt",
        footer_text: "PROJECTE OBSERVATORI D'IGUALTAT EDUCATIVA INCLUSIU © 2026 — Universitat de València",
        by_author: "Autor/a:",
        group_transversal: "Àmbits Transversals i Especials",
        group_subjects: "Matèries i Àrees (LOMLOE i BNCC)",
        group_others: "Altres"
    },
    pt: {
        page_title: "Observatório de Igualdade Educativa Inclusivo",
        header_title: "Observatório de Igualdade Educativa Inclusivo",
        btn_admin: "Administração",
        instructions_title: "PARA USAR OS PROMPTS DESTE REPOSITÓRIO, VOCÊ DEVE:",
        step_1: "Baixar e preencher o formulário.",
        step_2: "Baixar ou copiar o prompt.",
        step_3: "Inserir o prompt e o formulário em uma IA (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "Se você quiser enviar um prompt para a plataforma, use o botão «Administração» e preencha o formulário.",
        btn_download: "📥 Baixar formulário de contexto",
        search_placeholder: "Buscar prompts por palavra-chave, matéria, nível...",
        btn_copy: "📋 Copiar Prompt",
        copy_success: "Prompt copiado para a área de transferência com sucesso!",
        copy_error: "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.",
        no_results: "Nenhum prompt encontrado com esses termos de busca.",
        admin_panel_title: "Painel de Gestão de Prompts",
        prompt_title_label: "Título do Prompt",
        prompt_author_label: "Nome da pessoa que carrega o prompt",
        prompt_cat_label: "Categoria / Matéria",
        select_category_default: "-- Selecione uma opção --",
        prompt_body_label: "Conteúdo do Prompt",
        prompt_body_help: "Importante: Copie e cole o prompt estritamente em texto simples (sem formatação do Word ou HTML).",
        btn_cancel: "Cancelar",
        btn_save_prompt: "Salvar Prompt",
        footer_text: "PROJETO OBSERVATÓRIO DE IGUALDADE EDUCATIVO INCLUSIVO © 2026 — Universitat de València",
        by_author: "Autor/a:",
        group_transversal: "Áreas Transversais e Especiais",
        group_subjects: "Matérias e Áreas (LOMLOE e BNCC)",
        group_others: "Outros"
    },
    en: {
        page_title: "Inclusive Educational Equality Observatory",
        header_title: "Inclusive Educational Equality Observatory",
        btn_admin: "Administration",
        instructions_title: "TO USE THE PROMPTS IN THIS REPOSITORY, YOU MUST:",
        step_1: "Download and fill out the context form.",
        step_2: "Download or copy the prompt.",
        step_3: "Enter the prompt and the form into an AI (ChatGPT, Claude, DeepSeek, Gemini, etc.).",
        step_upload: "If you want to upload a prompt to the platform, click the «Administration» button and complete the form.",
        btn_download: "📥 Download context form",
        search_placeholder: "Search prompts by keyword, subject, level...",
        btn_copy: "📋 Copy Prompt",
        copy_success: "Prompt successfully copied to clipboard!",
        copy_error: "Could not copy automatically. Please select the text and copy it manually.",
        no_results: "No prompts found matching your search.",
        admin_panel_title: "Prompt Management Panel",
        prompt_title_label: "Prompt Title",
        prompt_author_label: "Name of the person uploading the prompt",
        prompt_cat_label: "Category / Subject",
        select_category_default: "-- Select an option --",
        prompt_body_label: "Prompt Content",
        prompt_body_help: "Important: Copy and paste the prompt strictly in plain text (without Word or HTML formatting).",
        btn_cancel: "Cancel",
        btn_save_prompt: "Save Prompt",
        footer_text: "INCLUSIVE EDUCATIONAL EQUALITY OBSERVATORY PROJECT © 2026 — Universitat de València",
        by_author: "Author:",
        group_transversal: "Transversal & Special Fields",
        group_subjects: "Subjects & Areas (LOMLOE & BNCC)",
        group_others: "Others"
    }
};

let currentLang = 'ca';
let promptsData = [];

// ====================================================================
// FUNCIÓ PER TRADUIR CATEGORIES MULTILLENGUA
// ====================================================================

function getLocalizedCategory(categoryString) {
    if (!categoryString) return '';
    const parts = categoryString.split('|').map(s => s.trim());
    if (parts.length < 4) return categoryString;

    const langIndex = { 'ca': 0, 'es': 1, 'pt': 2, 'en': 3 };
    const index = langIndex[currentLang] !== undefined ? langIndex[currentLang] : 0;
    return parts[index] || parts[0];
}

// ====================================================================
// CARREGAR DES DE SUPABASE
// ====================================================================

async function fetchPromptsFromSupabase() {
    try {
        const { data, error } = await supabaseClient
            .from('prompts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error en carregar de Supabase:", error);
            return;
        }

        if (data && data.length > 0) {
            // Mapegem 'content' a 'body' internament per mantenir la compatibilitat del renderitzat
            promptsData = data.map(item => ({
                ...item,
                body: item.content || item.body
            }));
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
        const author = p.author || p.autor || '';
        return title.toLowerCase().includes(searchQuery) ||
               category.toLowerCase().includes(searchQuery) ||
               body.toLowerCase().includes(searchQuery) ||
               author.toLowerCase().includes(searchQuery);
    });

    if (filtered.length === 0) {
        const noResultsMsg = translations[currentLang]?.no_results || "No results.";
        container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: #64748b;">${noResultsMsg}</p>`;
        return;
    }

    const copyBtnText = translations[currentLang]?.btn_copy || "📋 Copiar Prompt";
    const authorLabel = translations[currentLang]?.by_author || "Autor/a:";

    container.innerHTML = filtered.map(prompt => {
        const promptAuthor = prompt.author || prompt.autor;
        const localizedCat = getLocalizedCategory(prompt.category);
        return `
            <article class="prompt-card" id="prompt-${prompt.id}">
                <div class="prompt-header">
                    <span class="prompt-badge">${escapeHtml(localizedCat)}</span>
                    <h3>${escapeHtml(prompt.title)}</h3>
                    ${promptAuthor ? `<div class="prompt-author">${authorLabel} ${escapeHtml(promptAuthor)}</div>` : ''}
                </div>
                <div class="prompt-body">
                    <pre><code>${escapeHtml(prompt.body)}</code></pre>
                </div>
                <div class="prompt-actions">
                    <button class="btn-copy" onclick="copyPromptToClipboard('${prompt.id}')">
                        ${copyBtnText}
                    </button>
                </div>
            </article>
        `;
    }).join('');
}

async function copyPromptToClipboard(id) {
    const prompt = promptsData.find(p => p.id == id);
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

    document.querySelectorAll('optgroup[data-group]').forEach(group => {
        const groupKey = group.getAttribute('data-group');
        if (translations[currentLang] && translations[currentLang][groupKey]) {
            group.label = translations[currentLang][groupKey];
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
            const author = document.getElementById('new-prompt-author').value;
            const category = document.getElementById('new-prompt-category').value;
            const body = document.getElementById('new-prompt-body').value;

            // Enviem 'content' en lloc de 'body' per adaptar-nos a la taula de Supabase
            const newPrompt = { 
                title: title, 
                author: author, 
                category: category, 
                content: body 
            };

            const { data, error } = await supabaseClient
                .from('prompts')
                .insert([newPrompt])
                .select();

            if (error) {
                console.error("Error detallat de Supabase:", error.message, error.details, error.hint);
                alert("Error al guardar el prompt a la base de dades.");
                return;
            }

            if (data && data.length > 0) {
                const inserted = data[0];
                promptsData.unshift({
                    ...inserted,
                    body: inserted.content || inserted.body
                });
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
