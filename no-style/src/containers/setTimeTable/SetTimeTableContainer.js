import React, { useCallback, useEffect, useState } from "react";
import { where, getDocs, query } from "firebase/firestore";

import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { initLesson, selectLesson } from "../../modules/lesson";
import SetTimeTable from "../../components/setTimeTable/SetTimeTable";
import LessonList from "../../components/setTimeTable/LessonList";
import axios from 'axios';




const SetTimeTableContainer = () => {
   const {select} = useSelector(state => state.lessons);


   const [value, setValue] = useState('');
   const [type, setType] = useState('subject');
   const dispatch = useDispatch();
   
   const onChange = useCallback((e) => {
      setValue(e.target.value);
   }, []);

   const onSearch = useCallback(async (e) => {
      e.preventDefault();


      try {
         /// 수정해야하는 부분 1
         const response = await axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/lesson/getSearchedLessons', {
            keyword: value,
            type
         })
          /// 예시) 강영흥 검색하면 교수명이 강영흥인 강의들을 모두 불러옴
          

          


         //  [{강의 1}, {강의 2}]

          /// 강영흥인 강의들 리스트를 selectLesson(-----)
         await dispatch(selectLesson(response.data));

      } catch (error) {
          console.error('Error while searching:', error);
      }
  }, [type, value]);
  
  async function getQuerySnapshot(q) {
      const querySnapshot = await getDocs(query(
          q,
          where(type, '>=', value),
          where(type, '<=', value + '\uf8ff')
      ));
      return querySnapshot;
  }


   const onCheckOnlyOne = useCallback((checkThis) => {
      const checkboxes = document.getElementsByName('filter')
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkThis.target) {
          checkboxes[i].checked = false
        }
      }
      setType(checkThis.target.value);
    }, [type]);


   useEffect(() => {
      const {uid} = JSON.parse(localStorage.getItem('user'));

      const initData = async () => {
         try {
            const response = await axios.post('https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/api/init_lesson', {uid});

            await dispatch(initLesson(response.data));
         } catch(e) {
            console.log(e);
         }
      }

      initData();
   }, []);

   return (
      <div style={{
         width: '100%'
      }}>
         <div>
            <SetTimeTable onChange={onChange} onCheckOnlyOne={onCheckOnlyOne} onSearch={onSearch} value={value}></SetTimeTable>
         </div>
         <Outlet></Outlet>
         <LessonList datas={select}></LessonList>
      </div>
      
   )
}

export default SetTimeTableContainer;