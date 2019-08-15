import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../src/state';

declare module 'redux'{
  export interface Dispatch<A> extends ThunkDispatch<RootState, {}, A> {}
}