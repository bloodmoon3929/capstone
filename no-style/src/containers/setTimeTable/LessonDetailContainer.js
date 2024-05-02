import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { insertLesson } from '../../modules/lesson';
import LessonDetail from '../../components/setTimeTable/LessonDetail';

const LessonDetailContainer = () => {
   const {index} = useParams();
   const [data, setData] = useState();
   
   const {select} = useSelector(state => state.lessons);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      const data = select.filter(e => e.index === parseInt(index))[0]
      console.log(data);
      setData(data);
   }, [index]);


   const onClick = useCallback(() => {
      dispatch(insertLesson(data));
   }, [data]);

   const onGotoTimeTable = useCallback(() => {
      navigate('/setTimeTable');
   }, []);

   return (
      <div className="background">
         {
            data ? <LessonDetail data={data} 
            onGotoTimeTable={onGotoTimeTable} 
            onClick={onClick}></LessonDetail> : null
         }
      </div>      
   )
}

export default LessonDetailContainer;