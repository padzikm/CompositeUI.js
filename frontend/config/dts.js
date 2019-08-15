const ts = require('typescript')
const fs = require('fs')
const path = require('path')

function readDirRecurse(path) {
    let content = fs.readdirSync(path);
    let results = []
    for (let item of content) {
        if (item.endsWith('.json'))
            continue;
        if (item.endsWith('.d.ts')) {
            let substrLen = item.length - '.d.ts'.length
            let substr = item.substring(0, substrLen)
            results.push(substr)
        }
        else {
            let deeperPath = path + '/' + item;
            let deeperPathResults = readDirRecurse(deeperPath);
            for (let deeperItem of deeperPathResults) {
                let res = item + '/' + deeperItem
                results.push(res)
            }
        }
    }
    return results;
}

function getTsSourceFiles(filePath) {
    let program = ts.createProgram([filePath], {});
    return program.getSourceFiles();
}

function getAmbientModules(typingsPath) {
    let serviceModules = [];
    const serviceTypings = fs.readdirSync(typingsPath)
    for (singleTypingsFileName of serviceTypings) {
        let fullFilePath = path.resolve(typingsPath, singleTypingsFileName)
        const tsSourceFiles = getTsSourceFiles(fullFilePath)
        for (let sourceFile of tsSourceFiles) {
            let ambientModules = sourceFile.ambientModuleNames
            for (ambientModule of ambientModules)
                if (ambientModule.startsWith('@service/'))
                    serviceModules.push(ambientModule)
        }
    }
    return serviceModules;
}

module.exports = function (path) {
    let dirPaths = readDirRecurse(path)
    let packageJson = require(path + '/package.json')
    let serviceContractsPackageName = packageJson.name

    let results = []
    for (let path of dirPaths) {
        let fullPath = serviceContractsPackageName + '/' + path;
        results.push(fullPath)
    }

    return results;
}