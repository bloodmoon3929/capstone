import { useEffect } from 'react';
import { usereffect } from './login';


const useAuthStateChanged = (authService, navigator, dispatch) => {
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      console.log('check login state');
      if (user) {
        // 로그인 된 상태일 경우
        navigator('/');
        dispatch(usereffect(user));
      } else {
        // 로그아웃 된 상태일 경우
        navigator('/login');
        localStorage.removeItem("uid");
      }
    });

    // cleanup 함수 반환
    return () => unsubscribe();
  }, []); // 의존성 배열에 authService, navigator, dispatch 추가
};

export default useAuthStateChanged;