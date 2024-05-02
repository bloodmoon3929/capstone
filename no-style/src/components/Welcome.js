import styled from "styled-components";

const ButtonBlock = styled.div`
   width: 30vw;
   height: 15vw;
   /* border: 1px solid black; */
   display: flex;
   justify-content: center;
   align-items: center;
   .btn {
      border: none;
      width: 40%;
      height: 30%;
      background-color: rgb(68, 112, 67);
      color: white;
      padding: 15px 0;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: .2s;
      font-size: 20px;
      margin: 10px;
    }
    .btn:hover {
      background-color: rgb(49, 82, 48);
    }
`

const Welcome = ({onGotoTimeTable, onGotoArrangeMeeting}) => {
   return(
         <ButtonBlock>
            <button className="btn" onClick={onGotoTimeTable}>시간표 등록</button>
            <button className="btn" onClick={onGotoArrangeMeeting}>미팅시간 정하기</button>
         </ButtonBlock>
   )
}

export default Welcome;