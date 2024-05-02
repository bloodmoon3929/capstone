import { createAction, handleActions } from "redux-actions";
import { put, select, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "./loading";

const ADD_USER = 'users/ADD_USER';
const ADD_USER_FAILURE = 'users/ADD_USER_FAILURE';
const ADD_USER_SUCCESS = 'users/ADD_USER_SUCCESS';

const INIT_USER = 'users/INIT_USER';
const CLS_USER = 'users/CLS_USER';

export const addUser = createAction(ADD_USER, (user) => user);
export const initUser = createAction(INIT_USER, (user) => user);
export const clearUser = createAction(CLS_USER);

const initialState = {
   users: [],
}

function* addUserSaga(action) {
   yield put(startLoading('users'));
   const users = yield select(state => state.users.users);
   if(users.includes(...action.payload)) {
      // yield put(INSERT_LESSON_FAILURE);
      yield put({
         type: ADD_USER_FAILURE,
         payload: 'already added'
      });
      yield put(finishLoading('users'));
   } else {
      yield put({
         type: ADD_USER_SUCCESS,
         payload: action.payload
      })
      yield put(finishLoading('users'));
   }
}

export function* usersSaga() {
   yield takeLatest(ADD_USER, addUserSaga);
}


const users = handleActions({
   [ADD_USER]: (state) => ({
      users: [...state.users]
   }),
   [ADD_USER_SUCCESS]: (state, {payload: user}) => ({
      users: [...state.users, ...user]
   }),
   [INIT_USER]: (state, {payload: user}) => ({
      users: [...user],
   }),
   [CLS_USER]: (_) => ({
      users: [],
   })
}, initialState);

export default users;