import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, (part) => part);
export const finishLoading = createAction(FINISH_LOADING);

const initialState = {
};

const loading = handleActions({
   [START_LOADING]: (state, {payload: part}) => ({
      ...state,
      [part]: true,
   }),
   [FINISH_LOADING]: (state, {payload: part}) => ({
      ...state,
      [part]: false,
   })
}, initialState);

export default loading;