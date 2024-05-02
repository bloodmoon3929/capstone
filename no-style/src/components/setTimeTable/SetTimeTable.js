import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";


const SetTimeTableBlock = styled.div`
   width: 30vw;
   /* border: 1px solid black; */

   .form {
      width: 100%;
    display: flex;
    padding: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const CheckboxWrapper = styled.div`
   /* border: 1px solid black; */
   width: 50%;
   display: flex;
   align-items: center;
   margin-top: 10px;
`

const InputWrapper = styled.div`
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   width: 60vh;
   .keyword_search {
      border: 1px solid rgb(68, 112, 67);;
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

const SetTimeTable = ({onChange, onCheckOnlyOne, onSearch,
                        value}) => {
   return (
      <SetTimeTableBlock>
         <form className="form" onSubmit={onSearch}>
            <InputWrapper>
               <input value={value} onChange={onChange} 
               className="keyword_search"></input>
               <IoSearchSharp className="search_btn" onClick={onSearch}/>
            </InputWrapper>
            
            <CheckboxWrapper>
               <input type="checkbox" name="filter" value="subject" onChange={onCheckOnlyOne} /> 과목명
               <input type="checkbox" name="filter" value="professor" onChange={onCheckOnlyOne} /> 교수명
            </CheckboxWrapper>
          
         </form>
      </SetTimeTableBlock>
   )
}

export default SetTimeTable;