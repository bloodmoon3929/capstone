import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import lessons, { lessonSaga } from './lesson';
import loading from './loading';
import login, { loginRootSaga } from './login';
import users, { usersSaga } from './users';

const rootReducer = combineReducers({
   lessons, loading, login, users
});

export function* rootSaga() {
   yield all([lessonSaga(), loginRootSaga(), usersSaga()]);
}

export default rootReducer;