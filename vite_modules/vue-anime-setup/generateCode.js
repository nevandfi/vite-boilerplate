
export function generateCode () {

    return `
import anime from 'animejs/lib/anime.es.js';

export default {
    install: (app, defaultAnimationOptions) => {
        app.config.globalProperties.$anime = anime;

        app.directive('anime', (el, binding) => {

            const { arg, modifiers } = binding;
            let toggleState = false;

            if (!arg) {
                renderAnime();
                return;
            }

            if (arg.charAt(0) === "@") {
                el.addEventListener(arg.slice(1), renderAnime);
                return;
            }

            console.error(arg, "is an invaild directive argument!");

            function renderAnime() {
                if (Object.keys(modifiers).length === 0) {
                    anime({ targets: el, ...binding.value });
                    return;
                }

                if (modifiers.toggle) {
                    toggleState = !toggleState;
                    return anime({ targets: el, ...defaultAnimationOptions, ...binding.value[toggleState ? 0 : 1] })
                }
            }
        });
    }
}
    `;

}