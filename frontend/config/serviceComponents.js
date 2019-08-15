const requireDir = require('require-dir');
const getModules = require('./dts')

const serviceConfigs = requireDir('../service-configs');

module.exports.createModuleAliases = function (typingsPath, resolveModulePath, fallbackPath) {
    const serviceModules = getModules(typingsPath)
    let aliases = {};
    for (serviceModule of serviceModules) {
        for (key in serviceConfigs) {
            let serviceConfig = serviceConfigs[key]
            let serviceModulePath = serviceConfig(serviceModule)
            if (serviceModulePath != null) {
                const resolvedModulePath = resolveModulePath(serviceModulePath);
                if (resolvedModulePath != null) {
                    if (aliases[serviceModule] != null)
                        throw `duplicated service paths for ${serviceModule}`
                    aliases[serviceModule] = resolvedModulePath;
                }
            }
        }
        if (aliases[serviceModule] == null){
            console.log(`not found service module: ${serviceModule}`)
            aliases[serviceModule] = fallbackPath;
        }
    }
    console.log(aliases)
    return aliases;
}