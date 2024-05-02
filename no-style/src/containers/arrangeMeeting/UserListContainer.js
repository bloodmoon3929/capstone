import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addUser, clearUser, initUser } from "../../modules/users";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fbInstance";
import { useEffect } from "react";
import UserList from "../../components/ArrangeMeeting/UserList";

const UserListContainer = ({users}) => {
   const dispatch = useDispatch();
   const uid = useSelector((state) => state.login.uid);
   const add = (e) => {
      return () => {
         dispatch(addUser(e.table));
      }
   }

   useEffect(() => {
      (async function() {
         const docRef = doc(db, 'user', localStorage.getItem("uid"));
         const docSnap = await getDoc(docRef);
         await dispatch(initUser(docSnap.data().table));
      })();

      return () => {
         dispatch(clearUser());
      }
    }, []);

   return (
      <UserList users={users} add={add}></UserList>
   )
}

export default UserListContainer;