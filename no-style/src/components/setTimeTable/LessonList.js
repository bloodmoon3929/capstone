import React, { memo } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const LessonListItemBlock = styled.div`
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-around;
   width: 100%;
   
   &:hover {
      color: rgb(150, 209, 148);
      transition: .2s;
      font-weight: 700;
   }

   p {
      width: 100%;
      /* border: 1px solid black; */
   }
`

const LessonListItem = ({ data }) => {
   const navigate = useNavigate();

   const onClick = () => {
      navigate(`${data.index}`);
   }

   return (
      <LessonListItemBlock onClick={onClick}>
         <p>{data.subject.slice(0, 4)}...</p>
         <p>{data.professor}</p>
         <p>{data.number}</p>
         <p>{data.score}</p>
         <p>{data.time}</p>
      </LessonListItemBlock>
   )
}

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
