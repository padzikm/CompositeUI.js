const fs = require('fs')

module.exports = function(path){
    let packages = fs.readdirSync(path);
    let inputs = {};
    for(let pkg of packages){
        let fullPath = path + '/' + pkg + '/index.ts';
        inputs[pkg] = fullPath
    }

    return inputs
}