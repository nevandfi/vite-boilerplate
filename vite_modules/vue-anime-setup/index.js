
import { generateCode } from './generateCode';

function vueAnimeSetup() {

    let vueAnimeSetup = "@vue-anime-setup";
    let config = null;

    return {
        name: 'vue-anime-setup',
        configResolved(_config) {
            config = _config;
        },
        resolveId(id) {
            if (id === vueAnimeSetup) {
                return vueAnimeSetup;
            }
        },
        async load(id) {
            if (id === vueAnimeSetup) {
                return generateCode();
            }
        },
    }

}

export default vueAnimeSetup;