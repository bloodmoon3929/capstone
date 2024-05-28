import React, { useCallback, useState } from 'react';
import ArrangeMeeting from '../../components/ArrangeMeeting/ArrangeMeeting';
import axios from 'axios';


const ArrangeMeetingContainer = () => {
   const [name, setName] = useState('');
   const [users, setUsers] = useState([]); ///검색한 유저들의 정보가 저장되는 부분
    console.log('enter arrange meeting page');
   const onChange = (e) => {
      setName(e.target.value);
   }
   

   const onClick = useCallback(async (e) => {
    ///수정 2 사용자가 검색한 학번에 대한 학번리스트를 user에 저장하는 부분(리덕스에 저장이 아닌 useState setter로 저장 함)
    // 데이터 형식 : [{displayName: "2000123", table: Array(1)}, ...]
      e.preventDefault();
      const called = async ()=>{
         try {
            const response = await axios.post(
               'https://port-0-capstone-ss7z32llwlubbov.sel5.cloudtype.app/api/userlist',{name}
            );
            // 주어진 문자열
            
            const data = response.data.map((e, i) => {
               const table = e.data.replace(/\\"/g, '"');
               const ptable = JSON.parse(table);
               return {
                  ...e,
                  data : ptable
               }
            })
            
            const resData = data.map((e) => {
               return({
                  displayName: e.uid,
                  table : e.data
               })
            });

            setUsers(resData)
        } catch (error) {
            console.error('Error while searching:', error);
        }
      }
      called();
  }, [name]);


   return (
      <ArrangeMeeting onChange={onChange} name={name}
      users={users} onClick={onClick}></ArrangeMeeting>
   )
}

export default ArrangeMeetingContainer;