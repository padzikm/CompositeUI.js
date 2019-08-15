import { serviceState } from '../serviceDecorators/serviceState';

export * from './reducers'

@serviceState
class ServiceState {}