import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addUser, clearUser, initUser } from "../../modules/users";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fbInstance";
import { useEffect } from "react";
import UserList from "../../components/ArrangeMeeting/UserList";
import ArrangeMeetingSchedule from "../../components/ArrangeMeeting/ArrangeMeetingSchedule";
import axios from "axios";

const UserListContainer = ({users}) => {
   const dispatch = useDispatch();
   const uid = useSelector((state) => state.login.uid);
   const add = (e) => { ///e는 현재 유저임
      return () => {
         dispatch(addUser(e.table)); ///e.table은 현재 유저의 테이블을 store.user에 concat하는 부분임
      }
   }

   useEffect(() => {
      /// 수정 1 현재 사용자의 강의 정보들을 모두 읽어낸 후 store.user의 user에 저장함
      const {uid} = JSON.parse(localStorage.getItem('uid'));
      console.log(uid);
      console.log('initializing current user\'s timetable');

      const listdata = async ()=>{
         try
         {
            const response = await axios.post(
               'http://localhost:3001/arrageMeeting',{uid}
            );
            console.log(response.data);
            await dispatch(ArrangeMeetingSchedule(response.data))
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