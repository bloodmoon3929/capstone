import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const LessonListItemBlock = styled.div`
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-around;

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

const LessonListItem = ({data}) => {
   const navigate = useNavigate();

   const onClick = () => {
      navigate(`${data.index}`);
   }

   return(
         <LessonListItemBlock onClick={onClick}>
            <p>{data.subject}</p>
            <p>{data.professor}</p>
            <p>{data.number}</p>
            <p>{data.score}</p>
            <p>{data.time}</p>
         </LessonListItemBlock>
   )
}

const LessonListBlock = styled.div`
   /* border: 1px solid black; */

   
`

const LessonList = ({datas}) => {

   return(
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