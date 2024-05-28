import React, { memo } from 'react';
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

const AlwaysScrollSection = memo(props => {
   const {children} = props;
   return <LessonListBlock>
      {children}
   </LessonListBlock>
})

const LessonListBlock = styled.div`
   /* border: 1px solid black; */
   overflow: scroll;
   &::-webkit-scrollbar {
      /* 세로 스크롤 넓이 */
      width: 8px;

      /* 가로 스크롤 높이 */
      height: 8px;

      border-radius: 6px;
      background: rgba(255, 255, 255, 0.4);
   }
   &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
   } 
`

const LessonList = ({datas}) => {

   return(
      <AlwaysScrollSection>
         {
            datas ? 
            datas.map(e => (
               <LessonListItem data={e} key={e.index}></LessonListItem>
            )) : null
         }
      </AlwaysScrollSection>

   )
}

export default LessonList;