cd frontend-branding && yarn rollup && cd dts && yarn link && cd ../..
cd frontend-infrastructure && yarn link @service/branding && yarn rollup && cd dts && yarn link && cd ../..
cd frontend-catalog && yarn link @service/branding && yarn link @service/infrastructure && yarn rollup && cd ..
cd frontend-marketing && yarn link @service/branding && yarn link @service/infrastructure && yarn rollup && cd ..
cd frontend-sales && yarn link @service/branding && yarn link @service/infrastructure && yarn rollup && cd ..
cd frontend && yarn link @service/branding && yarn link @service/infrastructure && yarn build && cd ..
