export function generateCode (files, options) {

    const { storeDir } = options;

    const imports = [];
    const head = [];

    [...files].forEach(file => {
        const path = `/${storeDir}/${file}`;
        const fileData = createFileData(path, file);
        head.push(`import * as ${fileData.uniqueName} from '${fileData.importPath}'`);
        imports.push(`{
            directoryLevel: [${fileData.directoryLevel.map(dir => `'${dir}'`).join(',')}],
            importStore: ${fileData.uniqueName},
        }`);
    });

    return `
// Imports
${head.join('\n')}
import { createStore } from 'vuex';

// Store Structure
const storeStructure = [
    ${imports.join(',\n')}
];

// Build Store
let activeStore = {};

storeStructure.forEach(store => {

    const { directoryLevel, importStore } = store;

    if (directoryLevel.length === 0) {
        activeStore = createStore({...importStore});
        return;
    }
    
    activeStore.registerModule(directoryLevel, {...importStore});

});

export default {
    install: (app, options) => {
        app.use(activeStore);
    }
}
    `;

}

function createFileData(path, fileName) {
    let directoryLevel = fileName.replace(/(\/index\.js|index\.js)/g, '').split('/');
    if (directoryLevel[0] === '') directoryLevel = [];

    const dataStructure = {
        importPath: path,
        directoryLevel,
        uniqueName: fileName.replace(/(\/|\.)/g, '_'),
    }

    return dataStructure;
}