import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { stringToColorHash } from '../modules/color';

// styled-components로 스타일을 정의합니다.
const TimetableWrapper = styled.div`
  display: grid;
  grid-template-areas: ". week"
                       "time content";
  grid-template-columns: 60px;
  grid-template-rows: 30px;
  /* width: 30vw;
  height: 70vh; */
  width: 100%;
  height: 100%;
`;

const WeekNames = styled.div`
  grid-area: week;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-transform: uppercase;
  font-size: 1.1vmin;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-shadow: inset 1px 0 0 ${props => props.theme.porcelain};
  }
`;

const TimeInterval = styled.div`
  grid-area: time;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  font-size: 1.1vmin;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 1px 0 0 ${props => props.theme.porcelain};
  }
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  font-size: 1.2vmin;

  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(5, 1fr);
  & > div {
    box-shadow: inset 1px 0 0 ${props => props.theme.porcelain}, inset 0 1px 0 0 ${props => props.theme.porcelain};
  }
  p {
   color: white;
   background: rgba(0,0,0, 0.2);
   font-size: 1.6vmin;
   font-weight: 700;
  }
`;

const theme = {
   accentBase: '#8eeec0',
   cuttySark: '#546E7A',
   porcelain: '#ECEFF1'
 };

// Timetable 컴포넌트를 정의합니다.
const Schedule = () => {
   const lessons = useSelector(state => state.lessons.lessons);
   const [schedule, setSchedule] = useState([
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
      [...Array(5)],
   ]);

   useEffect(() => {
      const regex = /\([월화수목금토일]\)\d+(?:,\d+)?/g; // 요일과 시간을 나타내는 패턴
      const prev = [
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
         [...Array(5)],
      ]
      lessons.forEach((e) => {
         const ret = (e.time).match(regex) || [];
         const subject = e.subject;

         if(e.time2 !== '') {
            const ret1 = (e.time2).match(regex) || [];
            ret1.forEach(e => {
               let day = e.split('(').map(item => item.split(')'))[1];
               const [day1, time] = day;
               const times = time.split(',').map(Number); // 쉼표로 구분된 숫자를 배열로 변환
               
               
               switch(day1) {
                  case '월':
                     times.forEach(e => {
                        prev[e - 1][0] = {
                           subject: subject
                        }
                     }
                     )      
                     break;
                  case '화':
                     times.forEach(e => {
                        prev[e - 1][1] = {
                           subject: subject
                        }
                     })    
                     break;
                  case '수':
                     times.forEach(e => {
                        prev[e - 1][2] = {
                           subject: subject
                        }
                     })    
                     break;
                  case '목':
                     times.forEach(e => {
                        prev[e - 1][3] = {
                           subject: subject
                        }
                     })    
                     break;
                  case '금':
                     times.forEach(e => {
                        prev[e - 1][4] = {
                           subject: subject
                        }
                     })    
                     break;

                  default:

               }
            });
         }
      
         ret.forEach(e => {
            let day = e.split('(').map(item => item.split(')'))[1];
            const [day1, time] = day;
            const times = time.split(',').map(Number); // 쉼표로 구분된 숫자를 배열로 변환
            
            
            switch(day1) {
               case '월':
                  times.forEach(e => {
                     prev[e - 1][0] = {
                        subject: subject
                     }
                  }
                  )      
                  break;
               case '화':
                  times.forEach(e => {
                     prev[e - 1][1] = {
                        subject: subject
                     }
                  })    
                  break;
               case '수':
                  times.forEach(e => {
                     prev[e - 1][2] = {
                        subject: subject
                     }
                  })    
                  break;
               case '목':
                  times.forEach(e => {
                     prev[e - 1][3] = {
                        subject: subject
                     }
                  })    
                  break;
               case '금':
                  times.forEach(e => {
                     prev[e - 1][4] = {
                        subject: subject
                     }
                  })    
                  break;
               default:
            }
         })
      })
      setSchedule(prev);
   }, [lessons]);


  return (
    <TimetableWrapper>
      <WeekNames theme={theme}>
        {[ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </WeekNames>
      <TimeInterval theme={theme}>
        {[...Array(9)].map((_, index) => (
          <div key={index}>{`${index + 1}교시 ${index + 9}:00 - ${index + 10}:00`}</div>
        ))}
        
      </TimeInterval>
      <Content theme={theme}>
         {schedule.map((day, index1) => (
            day.map((e, index2) => (
               <div style={
                  {
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     background: e ? `linear-gradient(10deg, ${stringToColorHash(e.subject)}, white)` : 'white',
                     // background: e ? stringToColorHash(e.subject) : 'white',
                     opacity: 0.9,
                  }
               }
               key={index1 + index2}><p>{e ? e.subject : ''}</p></div>     
            ))
         ))
       }
      </Content>
    </TimetableWrapper>
  );
};

export default Schedule;
