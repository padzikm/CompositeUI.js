cd frontend-branding; & ./build.ps1; cd dts; yarn link; cd ../..
cd frontend-infrastructure; yarn link @service/branding; & ./build.ps1; cd dts; yarn link; cd ../..
cd frontend-catalog; yarn link @service/branding; yarn link @service/infrastructure; & ./build.ps1; cd ..
cd frontend-marketing; yarn link @service/branding; yarn link @service/infrastructure; & ./build.ps1; cd ..
cd frontend-sales; yarn link @service/branding; yarn link @service/infrastructure; & ./build.ps1; cd ..
cd frontend; yarn link @service/branding; yarn link @service/infrastructure; yarn build; cd ..
