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
   const [users, setUsers] = useState([]);
    console.log('dddarrangeMeeting');
   const onChange = (e) => {
      setName(e.target.value);
   }
   

   const onClick = useCallback(async (e) => {
      e.preventDefault();

      try {
          const q = collection(db, 'user');
          const querySnapshot = await getQuerySnapshot(q);
          const data = querySnapshot.docs.map(doc => doc.data());
          await setUsers(data);
      } catch (error) {
          console.error('Error while searching:', error);
      }
  }, [name]);
  
  async function getQuerySnapshot(q) {
      const querySnapshot = await getDocs(query(
          q,
          where('displayName', '>=', name),
          where('displayName', '<=', name + '\uf8ff')
      ));
      return querySnapshot;
  }

   return (
      <ArrangeMeeting onChange={onChange} name={name}
      users={users} onClick={onClick}></ArrangeMeeting>
   )
}

export default ArrangeMeetingContainer;