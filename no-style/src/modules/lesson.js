import { createAction, handleActions } from 'redux-actions';
import { finishLoading, startLoading } from './loading';
import { takeLatest, put, select } from 'redux-saga/effects';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../fbInstance';

const INSERT_LESSON = 'lesson/INSERT_LESSON';
const INSERT_LESSON_SUCCESS = 'lesson/INSERT_LESSON_SUCCESS';
const INSERT_LESSON_FAILURE = 'lesson/INSERT_LESSON_FAILURE';

const DELETE_LESSON = 'lesson/DELETE_LESSON';
const DELETE_LESSON_SUCCESS = 'lesson/DELETE_LESSON_SUCCESS';
const DELETE_LESSON_FAILURE = 'lesson/DELETE_LESSON_FAILURE';

const SAVE_LESSON = 'lessson/SAVE_LESSON';
const SAVE_LESSON_SUCCESS = 'lesson/SAVE_LESSON_SUCCESS';
const SAVE_LESSON_FAILURE = 'lesson/SAVE_LESSON_FAILURE';

const SELECT_LESSON = 'lesson/SELECT_LESSON';

const INIT_LESSON = 'lesson/INIT_LESSON';
const CLEAR_SELECT = 'lesson/CLEAR_SELECT';

export const insertLesson = createAction(INSERT_LESSON, (data) => data);
export const deleteLesson = createAction(DELETE_LESSON, (lesson) => lesson);
export const initLesson = createAction(INIT_LESSON, (lessons) => lessons);
export const saveLesson = createAction(SAVE_LESSON);
export const selectLesson = createAction(SELECT_LESSON, (lessons) => lessons);
export const clearSelect = createAction(CLEAR_SELECT);

const initialState = {
   lessons: [],
   select: [],
};

function* insertSaga(action) {
   yield put(startLoading('lesson'));
   const lessons = yield select(state => state.lessons.lessons);
   if(lessons.includes(action.payload)) {
      // yield put(INSERT_LESSON_FAILURE);
      yield put({
         type: INSERT_LESSON_FAILURE,
         payload: 'already added'
      });
      yield put(finishLoading('lesson'));
   } else {
      yield put({
         type: INSERT_LESSON_SUCCESS,
         payload: action.payload
      })
      yield put(finishLoading('lesson'));
      // yield put(INSERT_LESSON_SUCCESS);
   }
}

function* deleteSaga(action) {
   yield put(startLoading('lesson'));
   const lessons = yield select(state => state.lessons.lessons);
   if(lessons.includes(action.payload)) {
      yield put({
         type: DELETE_LESSON_SUCCESS,
         payload: action.payload
      });
      yield put(finishLoading('lesson'));
   } else {
      yield put({
         type: DELETE_LESSON_FAILURE,
         payload: 'no exist'
      })
      yield put(finishLoading('lesson'));
   }
}

function* saveSaga(action) {
   yield put(startLoading('lesson'));
   const lessons = yield select(state => state.lessons.lessons);
   const uid = yield select(state => state.login.uid);
   
   try {
      const userDocRef = yield doc(collection(db, 'user'), uid);
      setDoc(userDocRef, {
         table: lessons
      }, { merge: true });
      yield put({
         type: SAVE_LESSON_SUCCESS,
      })
   } catch(e) {
      yield put({
         type: SAVE_LESSON_FAILURE,
      })
   }
   yield put(finishLoading('lesson'));
}

export function* lessonSaga() {
   yield takeLatest(INSERT_LESSON, insertSaga);
   yield takeLatest(DELETE_LESSON, deleteSaga);
   yield takeLatest(SAVE_LESSON, saveSaga);
}

const lessons = handleActions({
   [INSERT_LESSON]: (state) => ({
      ...state
   }),
   [DELETE_LESSON]: (state) => ({
      ...state
   }),
   [INSERT_LESSON_SUCCESS]: (state, {payload: lesson}) => ({
      ...state,
      lessons: [...state.lessons].concat(lesson)
   }),
   [INSERT_LESSON_FAILURE]: (state) => ({
      ...state
   }),
   [DELETE_LESSON]: (state) => ({
      ...state
   }),
   [DELETE_LESSON_SUCCESS]: (state, {payload: lesson}) => ({
      ...state,
      lessons: [...state.lessons].filter(e => e !== lesson)
   }),
   [DELETE_LESSON_FAILURE]: (state) => ({
      ...state
   }),
   [SAVE_LESSON]: (state) => ({
      ...state
   }),
   [SAVE_LESSON_SUCCESS]: (state) => ({
      ...state
   }),
   [SAVE_LESSON_FAILURE]: (state) => ({
      ...state
   }),
   [SELECT_LESSON]: (state, {payload: lessons}) => ({
      ...state,
      select: lessons
   }),
   [INIT_LESSON] : (state, {payload: lessons}) => ({
      ...state,
      lessons: lessons
   }),
   [CLEAR_SELECT]: (state) => ({
      lessons: state.lessons,
      select: '',
   })
}, initialState);

export default lessons;