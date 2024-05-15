import { createAction, handleActions } from "redux-actions";
import { put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "./loading";
import { authService } from "../fbInstance";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = '/login/SUCCESS';
const LOGIN_FAILURE = '/login/FAILURE';

const LOGOUT = '/login/LOGOUT';

export const startLogin = createAction(LOGIN, (loginInfo) => loginInfo);
export const startLogout = createAction(LOGOUT);
export const usereffect = createAction(LOGIN_SUCCESS, (user) => user);

const initialState = {
   email: '',
   uid: '',
};

function* loginSaga(action) {
   yield put(startLoading('login'));
   try {
      const body = action.payload;

      const {email, password} = body;
      // const response = yield signInWithEmailAndPassword(authService, email, password);
      const response = yield axios.post('http://localhost:3001/login', body);
      const {email: resEmail, uid: resUid} = response.data[0];
      console.log(response.data);
      console.log(resEmail, resUid);
      //db에서 이메일이랑 uid를 얻어서 

      // user : {
      //    uid : '----',
      //    email: '----',
      // }
      yield put({
         type: LOGIN_SUCCESS,
         payload: response.data[0]
      });
      yield localStorage.setItem("uid", resUid);
   } catch(e) {
      yield put({
         type: LOGIN_FAILURE,
         payload: e
      })
   }
   yield put(finishLoading('login'));
}

function* logoutSaga(action) {
   yield put(startLoading('logout'));
   try {
      const response = yield authService.signOut();
      console.log(response);
   } catch(e) {
      console.log(e);
   }
   yield put(finishLoading('logout'));
}

export function* loginRootSaga() {
   yield takeLatest(LOGIN, loginSaga);
   yield takeLatest(LOGOUT, logoutSaga);
}

const login = handleActions({
   [LOGIN]: (state, action) => ({
      ...state
   }),
   [LOGIN_SUCCESS]: (state, {payload: user}) => ({
      ...state,
      email: user.email,
      uid: user.uid
   }),
   [LOGIN_FAILURE]: (state, action) => ({

   }),
   [LOGOUT]: (state, action) => ({
      email: '',
      uid: ''
   })
}, initialState);

export default login;