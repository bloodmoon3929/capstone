import { useDispatch } from "react-redux";
import { addUser, initUser } from "../../modules/users";

import { useEffect } from "react";
import UserList from "../../components/ArrangeMeeting/UserList";

import axios from "axios";

const UserListContainer = ({users}) => {
   const dispatch = useDispatch();

   const add = (e) => { ///e는 현재 유저임
      return () => {
         dispatch(addUser(e.table)); ///e.table은 현재 유저의 테이블을 store.user에 concat하는 부분임
      }
   }

   useEffect(() => {
      const listdata = async ()=>{
         try {
            const { uid } = JSON.parse(localStorage.getItem("user"));

            const response = await axios.post(
               'https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/api/initUser',{uid}
            );

            await dispatch(initUser(response.data));
         }
         catch(e)
         {
            console.log(e);
         }

      }

      listdata();
    }, []);

   return (
      <UserList users={users} add={add}></UserList>
   )
}

export default UserListContainer;