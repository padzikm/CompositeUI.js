rm -recurse -force esm; yarn rollup-windows; mkdir -path ../frontend/service-branding -force; rm -recurse -force ../frontend/service-branding/*; cp -recurse esm/* ../frontend/service-branding
