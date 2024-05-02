import React from 'react';
import { FaRegCalendarCheck } from "react-icons/fa6";
import styled from 'styled-components';

const UserListItemBlock = styled.div`
   width: 10vw;
   /* border: 1px solid black; */
   display: flex;
   align-items: center;

   &:hover {
      color: rgb(150, 209, 148);
      transition: .2s;
      font-weight: 700;
   }

   p {
      width: 60%;
      /* border: 1px solid black; */
      font-size: 1.2rem;
      margin:0;
      padding: 0;
      
   }
   .add {
      font-size: 1.5rem;
      /* border: 1px solid black; */
      
   }
`

const UserListItem = ({user, add: onAdd}) => {

   return(
         <UserListItemBlock onClick={onAdd}>
            <p>{user.displayName}</p>
            <FaRegCalendarCheck className="add" onClick={onAdd} />
            {/* <button onClick={onAdd}></button> */}
         </UserListItemBlock>
   )
}

const UserListBlock = styled.div`
   /* border: 5px solid black; */
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
`

const UserList = ({users, add}) => {

   return(
      <UserListBlock>
         {
            users ? users.map((e) => (
               <UserListItem user={e} add={add(e)}></UserListItem>
            )) : null
         }
      </UserListBlock>

   )
}

export default UserList;