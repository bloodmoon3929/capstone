import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";


const SetTimeTableBlock = styled.div`
   width: 100%;
   /* border: 1px solid black; */
   .form {
      width: 100%;
    display: flex;
    padding: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      margin: 0;
      padding: 0;
      /* border: solid 1px black; */
      width: 10rem;
    }
  }
`

const CheckboxWrapper = styled.div`
   /* border: 1px solid black; */
   display: flex;
   flex-direction: row;
   width: 10rem;
   align-items: center;

`

const InputWrapper = styled.div`
   /* border: 1px solid black; */
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   width: 10rem;
   .keyword_search {
      border: 1px solid rgba(68, 112, 67, 0.3);;
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
      box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
   }

   .search_btn {
      font-size: 2rem;
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
               <input type="checkbox" name="filter" value="subject" onChange={onCheckOnlyOne} /> <p> 과목명</p>
               <input type="checkbox" name="filter" value="professor" onChange={onCheckOnlyOne} /> <p> 교수명</p>
            </CheckboxWrapper>
          
         </form>
      </SetTimeTableBlock>
   )
}

export default SetTimeTable;