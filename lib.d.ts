
// CUSTOM TYPES ONLY

type RouteRecordRaw = import('vue-router').RouteRecordRaw;
type RouteRecordRawLayout = RouteRecordRaw & { layout? : String } & { children? : RouteRecordRawLayout[] };

type GenerateLayoutRouteConfig = {
    defaultLayout? : String,
    componentNameHandler? : Function,
    layoutsDir? : String
}

type GenerateStoreConfig = {
    storeDir? : String
}

type GenerateI18nSetupConfig = {
    localesDir? : String,
    defaultLocale? : String,
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
  