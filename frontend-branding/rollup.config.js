import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss-modules'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const inputBuilder = require('./inputBuilder');

let input = inputBuilder('src')
console.log(input)

export default [
    {
        input,
        output: [
            {
                dir: `esm`,
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
            typescript({
                useTsconfigDeclarationDir: true
            })
        ]
    }
];