import styled from "styled-components"
import { MdCancelPresentation } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const LessonDetailBlock = styled.div`
   /* border: 1px solid black; */

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border-radius: 8px;

   box-shadow: 0px 15px 15px 10px rgba(0, 0, 0, 0.3);
`;

const ButtonBlock = styled.div`
   margin-top: 10px;
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-between;
   width: 95%;
   .goBack {
      font-size: 40px;
      transition: .2s;
      color: rgb(68, 112, 67);

      &:hover {
         color: rgb(49, 82, 48);
      }
   }

   .add {
      font-size: 40px;
      transition: .2s;
      color: rgb(68, 112, 67);

      &:hover {
         color: rgb(49, 82, 48);
      }
   }
`

const DataBlock = styled.div`
   width: 95%;
   /* border: 1px solid black; */
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   p, h2 {
      margin: 0;
      padding: 0;
      /* border: 1px solid black; */
      width: 80%;
   }

   margin-bottom: 20px;
`

const LessonDetail = ({data, onGotoTimeTable, onClick}) => {
   return(
      <LessonDetailBlock>
         <ButtonBlock>
            <MdCancelPresentation className="goBack" onClick={onGotoTimeTable} />
            <IoAdd className="add" onClick={onClick} />
         </ButtonBlock>
         <DataBlock>
            <h2>{data.subject}</h2>
            <p>{data.professor}</p>
            <p>{data.number}</p>
            <p>{data.score}</p>
            <p>{data.time}
            {
               data.time2 !== '' ? data.time2 : ''
            }
            {
               data.time3 !== '' ? data.time3 : ''
            }
            </p>
            
         </DataBlock>
      </LessonDetailBlock>
   )
}

export default LessonDetail;