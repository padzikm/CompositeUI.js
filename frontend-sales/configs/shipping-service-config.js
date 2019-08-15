const outputDir = 'shipping'

const entries = {
    'shipping': 'src/shipping.tsx',
}

module.exports = function(importedModuleName){
    switch(importedModuleName){
        case '@service/compositeShipping':
            return `${outputDir}/shipping`;
        default:
            return null;
    }
}

module.exports.outputDir = outputDir

module.exports.entries = entries