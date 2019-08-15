const glob = require('glob')
const fs = require('fs')

let componentOutFileMapping = null;
let componentEntriesMapping = null;
let stateEntryMapping = null;
const outputDir = 'sales'
const stateOutputFile = 'serviceState';

function discoverServiceComponents() {
    const foundFiles = glob.sync('src/**/*.{ts,tsx}')

    const searchedPhrase = '@serviceComponent('
    const adjust = searchedPhrase.length;
    const adjustByOpenQuote = adjust + 1;

    const serviceComponents = [];

    for (let file of foundFiles) {
        const data = fs.readFileSync(file, 'utf8')
        let startIndx = data.indexOf(searchedPhrase)
        while (startIndx >= 0) {
            let startAdjusted = startIndx + adjustByOpenQuote;
            let closedIndx = data.indexOf(')', startAdjusted);
            let closedAdjustByClosedQuote = closedIndx - 1;
            let componentName = data.substring(startAdjusted, closedAdjustByClosedQuote)
            const componentMapping = {
                file,
                componentName,
            };
            serviceComponents.push(componentMapping)
            let nextStartIndx = closedIndx + 1;
            startIndx = data.indexOf(searchedPhrase, nextStartIndx)
        }
    }

    return serviceComponents;
}

function discoverServiceStates() {
    const foundFiles = glob.sync('src/**/*.ts')

    const searchedPhrase = '@serviceState'

    const serviceStates = [];

    for (let file of foundFiles) {
        const data = fs.readFileSync(file, 'utf8')
        let startIndx = data.indexOf(searchedPhrase)
        if(startIndx >= 0){
            serviceStates.push(file)
        }
    }

    return serviceStates;
}

function setupStateMapping(){
    try{
        const serviceStates = discoverServiceStates();
        
        if(serviceStates.length > 1)
            throw 'there must be only one service state entry'
        stateEntryMapping = {};
        if(serviceStates.length === 1)
            stateEntryMapping[stateOutputFile] = serviceStates[0];
    }
    catch(ex){
        stateMapping = null;
        throw ex;
    }
}

function combineEntriesMapping(){
    let entries = {}
    if(Object.keys(stateEntryMapping).length > 0)
        Object.assign(entries, stateEntryMapping)
    if(Object.keys(componentEntriesMapping).length > 0)
        Object.assign(entries, componentEntriesMapping)
    return entries;
}

function setupComponentMappings() {
    if (componentOutFileMapping && componentEntriesMapping)
        return
    componentOutFileMapping = {};
    componentEntriesMapping = {};
    try {
        const serviceComponentsMappings = discoverServiceComponents();
        createEntriesAndComponentMappings(serviceComponentsMappings);
    }
    catch (ex) {
        componentOutFileMapping = null;
        componentEntriesMapping = null;
        throw ex;
    }
}

function createEntriesAndComponentMappings(serviceComponentsMappings) {
    for (let mapping of serviceComponentsMappings) {
        const file = mapping.file
        const componentName = mapping.componentName

        let fileInEntries = false;
        let outFile = null;
        for (let key in componentEntriesMapping) {
            let sourceFile = componentEntriesMapping[key]
            if (file === sourceFile) {
                fileInEntries = true;
                outFile = key;
                break;
            }
        }
        if (!fileInEntries) {
            let atStripped = componentName.substring(1);
            outFile = atStripped.split('/').join('-');
            componentEntriesMapping[outFile] = file;
        }

        componentOutFileMapping[componentName] = `${outputDir}/${outFile}`
    }
}

function generateServiceConfig(serviceComponentOutFileMapping) {

    let content = `module.exports = function(importedModuleName){
        const componentMapping = ${JSON.stringify(serviceComponentOutFileMapping)}
    
        const file = componentMapping[importedModuleName]

    if(!file)
    return null
    return file
}`
    return content;
}

module.exports.outputDir = outputDir

module.exports.getEntries = function () {
    setupComponentMappings();
    setupStateMapping();
    let entries = combineEntriesMapping();
    return entries;
}

module.exports.writeServiceConfig = function (fileName) {
    setupComponentMappings();
    const data = generateServiceConfig(componentOutFileMapping)
    fs.writeFileSync(fileName, data)
}