rm -recurse -force esm; yarn rollup-windows; mkdir -path ../frontend/service-components -force; mkdir -path ../frontend/service-configs -force; rm -recurse -force ../frontend/service-components/marketing; cp -recurse esm/* ../frontend/service-components; cp service-config.js ../frontend/service-configs/service-marketing-config.js