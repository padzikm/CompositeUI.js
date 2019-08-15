declare global {
    interface NodeRequire {
        context: any
    }
}


export function loadServiceStates(): any[] {
    let serviceStates: any[];
    
    const cache:any = {};
    
    function importAll(r:any) {
        r.keys().forEach((key:string) => cache[key] = r(key));
    }

    importAll(require.context('@service-components', true, /serviceState\.js$/));

    serviceStates = Object.values(cache)

    return serviceStates;
}
