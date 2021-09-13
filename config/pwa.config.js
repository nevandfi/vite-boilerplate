
export default {
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
        name: 'Shuttle Vite Boilerplate',
        short_name: 'Shuttle Vite',
        description: 'This is a boilerplate for a Vite and Vue setup. It comes with features inspired from many different frameworks.',
        theme_color: '#000000',
        icons: [
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
            }
        ]
    },
    workbox: {
        sourcemap: true
    },
    registerType: 'autoUpdate',
}