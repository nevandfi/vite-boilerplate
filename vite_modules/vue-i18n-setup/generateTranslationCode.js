import { parse } from 'path'
import { readFileSync } from 'fs'

export function generateTranslationCode(files, rootDir, options) {

    const { localesDir } = options;

    const translationData = [];
    
    files.forEach(file => {
        const langCode = parse(file).name;
        const filePath = `${rootDir}/${localesDir}/${file}`;

        const translationFileContent = readFileSync(filePath, {encoding:'utf8', flag:'r'});
        translationData.push(`'${langCode}': ${translationFileContent}`);
    });

    return `
export default {
    ${translationData.join(',\n')}
}
    `;

}