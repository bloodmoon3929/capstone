import { useNavigate } from "react-router";
import styled from "styled-components";
import React from 'react';

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

export default React.memo(LessonListItem);