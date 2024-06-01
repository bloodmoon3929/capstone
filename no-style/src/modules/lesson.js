import { createAction, handleActions } from 'redux-actions';
import { finishLoading, startLoading } from './loading';
import { takeLatest, put, select } from 'redux-saga/effects';

import axios from 'axios';

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
   select: [], /// 일단 현재 검색한 강의들을 일시 저장하는 곳
};

function* insertSaga(action) {
   yield put(startLoading('lesson'));
   const lessons = yield select(state => state.lessons.lessons);



   if(lessons.includes(action.payload)) {
      // yield put(INSERT_LESSON_FAILURE);
      alert('이미 추가되었습니다');
      yield put({
         type: INSERT_LESSON_FAILURE,
         payload: 'already added'
      });
      
   } else {
      function parseSchedule(schedule) {
         const days = ["월", "화", "수", "목", "금", "토", "일"];
         const parsed = {};
         days.forEach(day => {
            const regex = new RegExp(`\\(${day}\\)(\\d+(,\\d+)*)`, "g");
            const matches = schedule.match(regex);
            if (matches) {
                  matches.forEach(match => {
                     const times = match.slice(2).split(',');
                     if (!parsed[day]) {
                        parsed[day] = new Set();
                     }
                     times.forEach(time => parsed[day].add(time));
                  });
            }
         });
         return parsed;
      }
   
      function isConflict(schedule1, schedule2) {
         for (let day in schedule1) {
            if (schedule2[day]) {
                  for (let time of schedule1[day]) {
                     if (schedule2[day].has(time)) {
                        return true;
                     }
                  }
            }
         }
         return false;
      }
   
      function addLecture(existing, newLecture) {
         const newSchedule = parseSchedule(newLecture.time);
         for (let lecture of existing) {
            const existingSchedule = parseSchedule(lecture.time);
            if (isConflict(existingSchedule, newSchedule)) {
                  return false;
            }
         }
         return true;
      }
   
      if(addLecture(lessons, action.payload)) {
         yield put({
            type: INSERT_LESSON_SUCCESS,
            payload: action.payload
         })
      } else {
         yield put({
            type: INSERT_LESSON_FAILURE,
            payload: 'time conflict'
         });
         alert('시간이 겹치는 강의가 존재합니다.');
      }
      
      // yield put(INSERT_LESSON_SUCCESS);
   }
   yield put(finishLoading('lesson'));
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
      alert('존재하지 않는 강의입니다.');
      yield put(finishLoading('lesson'));
   }
}

function* saveSaga(action) {
   yield put(startLoading('lesson'));
   const lessons = yield select(state => state.lessons.lessons);

   const uid = yield select(state => state.login.uid);

   
   try {
      const response = yield axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/api/save', {
      //const response = yield axios.post('http://localhost:3001/api/save', {
         lessons,
         uid
      })
      yield put({
         type: SAVE_LESSON_SUCCESS,
      })
      alert('저장되었습니다');
   } catch(e) {
      yield put({
         type: SAVE_LESSON_FAILURE,
      })
      alert('오류가 발생하였습니다');
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
      //...state,
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