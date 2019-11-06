declare namespace ghost {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function init(options: any): void;
    namespace url {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function api(resource: string, parameter: Record<string, any>): any;
    }
}
