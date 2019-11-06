declare module '@tryghost/content-api';
interface GhostApi {
    url: string;
    key: string;
    version: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function GhostContentAPI(apiParams: GhostApi): any;
