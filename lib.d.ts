
// CUSTOM TYPES ONLY

type RouteRecordRaw = import('vue-router').RouteRecordRaw;
type RouteRecordRawLayout = RouteRecordRaw & { layout? : String } & { children? : RouteRecordRawLayout[] };

type GenerateLayoutRouteConfig = {
    defaultLayout? : String,
    componentNameHandler? : Function,
}