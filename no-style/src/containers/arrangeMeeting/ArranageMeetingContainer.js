import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../fbInstance';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { initLesson } from '../../modules/lesson';
import UserListContainer from './UserListContainer';
import { Outlet } from 'react-router';
import ArrangeMeeting from '../../components/ArrangeMeeting/ArrangeMeeting';


const ArrangeMeetingContainer = () => {
   const dispatch = useDispatch();
   const [name, setName] = useState('');
   const [users, setUsers] = useState([]); ///검색한 유저들의 정보가 저장되는 부분
    console.log('enter arrange meeting page');
   const onChange = (e) => {
      setName(e.target.value);
   }
   

//    const onClick = useCallback(async (e) => {
//     ///수정 2 사용자가 검색한 학번에 대한 학번리스트를 user에 저장하는 부분(리덕스에 저장이 아닌 useState setter로 저장 함)
//     // 데이터 형식 : [{displayName: "2000123", table: Array(1)}, ...]
//       e.preventDefault();

//       try {
//           const q = collection(db, 'user');
//           const querySnapshot = await getQuerySnapshot(q);
//           const data = querySnapshot.docs.map(doc => doc.data());
//           await setUsers(data);
//       } catch (error) {
//           console.error('Error while searching:', error);
//       }
//   }, [name]);
    const onClick = () => {
        console.log('click');
    }
    
//   async function getQuerySnapshot(q) {
//       const querySnapshot = await getDocs(query(
//           q,
//           where('displayName', '>=', name),
//           where('displayName', '<=', name + '\uf8ff')
//       ));
//       return querySnapshot;
//   }

   return (
      <ArrangeMeeting onChange={onChange} name={name}
      users={users} onClick={onClick}></ArrangeMeeting>
   )
}

export default ArrangeMeetingContainer;