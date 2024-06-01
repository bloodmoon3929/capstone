import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import LessonListItem from './LessonListItem';



const LessonListBlock = styled.div`
   /* border: 1px solid black; */
   width: 100%;
   max-height: 35vh;
   overflow-y: auto;
   &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
   }
   &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
   } 
`

const LessonList = ({ datas }) => {
   return (
      <LessonListBlock>
         {
            datas ?
               datas.map(e => (
                  <LessonListItem data={e} key={e.index}></LessonListItem>
               )) : null
         }
      </LessonListBlock>
   )
}

export default LessonList;
