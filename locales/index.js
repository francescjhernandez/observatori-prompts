import { ca } from './ca.js';
import { es } from './es.js';
import { en } from './en.js';
import { pt } from './pt.js';

const translations = { ca, es, en, pt };

/**
 * Mapeig de compatibilitat per a claus soles que en els fics JS estan anidades.
 */
const FALLBACK_MAP = {
  'instructions_title': 'instructions.title',
  'step_1': 'instructions.step_1',
  'step_2': 'instructions.step_2',
  'step_3': 'instructions.step_3',
  'step_upload': 'instructions.upload_note',
  'btn_download': 'instructions.download_form',
  'search_placeholder': 'instructions.search_placeholder',
  'header_title': 'instructions.header_title',
  'btn_admin': 'instructions.upload_btn'
};

/**
 * Retorna el text traduït segons la clau i l'idioma.
 * @param {string} path - Camí de la clau (ex: 'form.btn_upload_prompts' o 'instructions_title')
 * @param {string} lang - Idioma ('ca', 'es', 'en', 'pt')
 * @returns {string}
 */
export function t(path, lang = 'ca') {
  const currentLang = translations[lang] || translations.ca;
  
  // 1. Si la clau existeix directament en l'arrel de l'objecte (clau plana)
  if (currentLang[path] !== undefined) {
    return currentLang[path];
  }

  // 2. Determinar el camí real (si ve de la taula de compatibilitat o és un path directament)
  const targetPath = FALLBACK_MAP[path] || path;

  // 3. Resolució recursiva/per punts (notació d'objecte anidat)
  const keys = targetPath.split('.');
  let result = currentLang;

  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      return path; // Retorna la clau original si no troba la traducció
    }
  }

  return result;
}

/**
 * Retorna un array amb totes les matèries traduïdes per a omplir el <select>
 * @param {string} lang - Idioma actual ('ca', 'es', 'en', 'pt')
 * @returns {Array<{code: string, label: string}>}
 */
export function getSubjectOptions(lang = 'ca') {
  const currentLang = translations[lang] || translations.ca;
  const subjectsObj = currentLang.subjects || {};

  return Object.keys(subjectsObj).map((code) => ({
    code: code,       // Valor tècnic per a guardar (ex: 'history')
    label: subjectsObj[code]  // Text visible segons l'idioma
  }));
}
