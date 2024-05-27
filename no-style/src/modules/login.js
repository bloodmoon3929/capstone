import { createAction, handleActions } from "redux-actions";
import { put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "./loading";
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = '/login/SUCCESS';
const LOGIN_FAILURE = '/login/FAILURE';
const UNAUTHERIZE = '/login/UNAUTHERIZE';

const LOGOUT = '/login/LOGOUT';

export const startLogin = createAction(LOGIN, (loginInfo) => loginInfo);
export const startLogout = createAction(LOGOUT);
export const usereffect = createAction(LOGIN_SUCCESS, (user) => user);

const initialState = {
   email: '',
   uid: '',
   isValid: true,
};

function* loginSaga(action) {
   yield put(startLoading('login'));
   try {
      const body = action.payload;
      // const response = yield signInWithEmailAndPassword(authService, email, password);
      const response = yield axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/login', body);

      const { token } = response.data;      
      console.log(token);
      const decodedToken = jwtDecode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(decodedToken));

      console.log({email : decodedToken.email, uid: decodedToken.uid});

      yield put({
         type: LOGIN_SUCCESS,
         payload: {
            email : decodedToken.email,
            uid: decodedToken.uid
         }
      });

      //db에서 이메일이랑 uid를 얻어서 
   } catch(e) {
      alert('존재하지 않는 아이디이거나 비밀번호가 틀렸습니다')
      yield put({
         type: LOGIN_FAILURE,
         payload: e
      })
   }
   yield put(finishLoading('login'));
}

///depreciated
function* logoutSaga(action) {
   yield put(startLoading('logout'));
   try {
      
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
      email: user.email,
      uid: user.uid,
      isValid: true,
   }),
   [LOGIN_FAILURE]: (state, action) => ({
      ...state,
      isValid: false,
   }),
   [LOGOUT]: (state, action) => ({
      email: '',
      uid: '',
      isValid: false,
   }),
   [UNAUTHERIZE]: (state, action) => ({
      ...state,
   })
}, initialState);

export default login;