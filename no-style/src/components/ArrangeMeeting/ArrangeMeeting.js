import styled from "styled-components";
import UserListContainer from "../../containers/arrangeMeeting/UserListContainer";
import { IoSearchSharp } from "react-icons/io5";

const ArrangeMeetingBlock = styled.div`
   width: 30vw;
   .form {
      display: flex;
      padding: 30px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
`;

const InputWrapper = styled.div`
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   width: 30vh;
   .keyword_search {
      border-radius: 5px;
      background: none;
      padding: 10px;
      font-weight: 700; 
      transition: .2s;
      width: 70%;
   }

   .keyword_search:active,
   .keyword_search:focus,
   .keyword_search:hover {
      outline: none;
      border-bottom-color: rgb(68, 112, 67);
   }

   .search_btn {
      font-size: 33px;
      transition: .2s;
      color: rgb(68, 112, 67);

      &:hover {
         color: rgb(49, 82, 48);
      }
   }
`

const ArrangeMeeting = ({onChange, name, users, onClick}) => {
   return(
      <ArrangeMeetingBlock>
         <h2>미팅시간정하기</h2>
         <form className="form" onSubmit={onClick}>
            <InputWrapper>
               <input type="text" onChange={onChange} value={name}
               className="keyword_search"></input>
               <IoSearchSharp className="search_btn" onClick={onClick}/>
            </InputWrapper>
         </form>
         
         {
            users ? <UserListContainer users={users}></UserListContainer> 
            : null
         }
      </ArrangeMeetingBlock>
   )
}

export default ArrangeMeeting;