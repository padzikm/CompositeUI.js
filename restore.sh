cd frontend-infrastructure && yarn && cd ..
cd frontend-branding && yarn && cd ..
cd frontend-catalog && yarn && cd ..
cd frontend-marketing && yarn && cd ..
cd frontend-sales && yarn && cd ..
cd frontend && yarn && cd ..

cd frontend
cd service-contracts && yarn link && cd ..
cd redux-actions && yarn link && cd ..
cd route-contracts && yarn link && cd ..
cd ..

cd frontend-branding && yarn link @service/routes && cd ..
cd frontend-infrastructure && yarn link @service/routes && yarn link @service/components && cd ..
cd frontend-catalog && yarn link @service/routes && yarn link @service/components && yarn link @service/actions && cd ..
cd frontend-marketing && yarn link @service/routes && yarn link @service/components && yarn link @service/actions && cd ..
cd frontend-sales && yarn link @service/routes && yarn link @service/components && yarn link @service/actions && cd ..
