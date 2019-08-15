import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const configBuilder = require('./config-builder')

const outputDir = configBuilder.outputDir
const entries = configBuilder.getEntries()

configBuilder.writeServiceConfig('service-config.js')

export default [
    {
        input: entries,
        output: [
            {
                dir: `esm/${outputDir}`,
                format: 'esm'
            }
        ],
        external: (id) => id.startsWith('@branding/') || id.startsWith('@service/'),
        plugins: [
            peerDepsExternal({
                includeDependencies: true,
            }),
            resolve(),
            postcss({
                extract: false,
                writeDefinitions: false,
            }),
            commonjs(),
            typescript()
        ]
    }
];