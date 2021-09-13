import { parse } from 'path';

export function generateCode (files, options) {

    const { localesDir, defaultLocale } = options;

    const allLocales = [];
    const localesData = [];
    const head = [];

    [...files].forEach(file => {
        const langData = generatelangData(file, localesDir);
        allLocales.push(langData.langCode);
        head.push(`import ${langData.uniqueName} from '${langData.importPath}'`);
        localesData.push(`'${langData.langCode}': { langName: '${langData.langName}', langData: ${langData.uniqueName} }`);
    });

    return `
// Imports
${head.join('\n')}

import { createI18n } from "vue-i18n";
import allLocaleTranslations from "@vue-i18n-setup:localeTranslation";

// Locales Data
const localesData = {
    ${localesData.join(',\n')}
};

const defaultLocale = '${defaultLocale}';
const allAvailableLocales = [${allLocales.map(locale => `'${locale}'`).join(',')}];
const userLocalePreference = navigator?.languages;

let selectedLanguage = defaultLocale;

if (userLocalePreference) {
    for (let userLang of userLocalePreference) {
        let selected = false;
        for (let optionlang of allAvailableLocales) {
            if (userLang === optionlang) {
                selected = true;
                selectedLanguage = userLang;
                break;
            }
        }
        if (selected) break;
    }
}

const i18n = createI18n({
    locale: selectedLanguage,
    fallbackLocale: allAvailableLocales,
    messages: allLocaleTranslations,
})

export default {
    install: (app, options) => { 
        app.use(i18n);
    }
}

    `;

}

function generatelangData(file, localesDir) {
    const importPath = `/${localesDir}/${file}`;
    const parsedPath = parse(importPath);
    
    const langCode = parsedPath.name;
    const intlNameHandler = new Intl.DisplayNames([langCode], {type: 'language'});

    const langName = intlNameHandler.of(langCode);
    const uniqueName = `locale_${langCode.replace(/\-/g, '_')}`;


    return {
        langCode,
        langName,
        importPath,
        uniqueName
    }
}