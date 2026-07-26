import { ca } from './ca.js';
import { es } from './es.js';
import { en } from './en.js';
import { pt } from './pt.js';

const translations = { ca, es, en, pt };

/**
 * Retorna el text traduït segons la clau i l'idioma.
 * @param {string} path - Camí de la clau (ex: 'subjects.history')
 * @param {string} lang - Idioma ('ca', 'es', 'en', 'pt')
 * @returns {string}
 */
export function t(path, lang = 'ca') {
  const currentLang = translations[lang] || translations.ca;
  const keys = path.split('.');
  let result = currentLang;

  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      return path; // Retorna la clau si no troba la traducció
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
    code: code,               // Valor tècnic per a guardar (ex: 'history')
    label: subjectsObj[code]  // Text visible segons l'idioma
  }));
}
