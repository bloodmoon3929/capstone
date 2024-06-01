# firebase
## collection
collection은 그냥 폴더임

ex) 게시물

## document
collection안에 document드갈수 있음

document는 객체같은거임 프로퍼티 존재함

### 원하는 collection자료 가져오기

```javascript
db.collection('폴더명').get()다가져옴.then((res) => {
   console.log(res);
});
```


### 규칙
누구나 데이터베이스에 접근가능하게 할 수 있음

```javascript
allow read, write: if true:
```

### document출력하기

```javascript
const q = collection(db, 'App');
const querySnapshot = await getDocs(q);
querySnapshot.forEach(e => {
   console.log(e.data());
})
```

'App' collection의 doc들을 배열로 querySnapshot에 넣음
querySnapshot을 순회하여 data()하면 객체로 값을 얻을 수 있음


### 원하는 doc생성하기
```javascript
data.forEach(e => {
         addDoc(collection(db, 'App'), e);
      })
```

```javascript
data.forEach(e => {
         addDoc(collection(db, 'App'), e);
      })
```
add는 랜덤id를 부여함


### where

```javascript
const q = collection(db, 'App');
const querySnapshot = await getDocs(q).where('field', '==', 'value');
```

### 특정 유저의 uid를 이용하여 doc 생성하기

```javascritp
const userDocRef = doc(collection(db, 'user'), data.user.uid);
setDoc(userDocRef, {
   name: 'hello'
});
```

# server.js

## init Mysql session store 

```javascript
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(sessionOption);
```

## bodyParser middleware는 express 4.16.0v 이상 부터 express.json() 으로 사용가능하다

```javascript
app.use(express.json());
```

## front code의 build경로

```javascript
express.static(path.join(__dirname, '/build'));
```

__dirname은 서버파일의 절대주소이며 전달인자를 통해 절대경로들을 생성한다.
이 미들웨어는 파일시스템에서 요청된 경로를 찾아 클라이언트에게 전송한다.

즉 절대 경로를 전달하여 build디렉토리에있는 파일들을 정적파일로서 제공할 위치를 지정하는 함수가 express.static이다.

## login store

![Alt text](image.png)

### backend nodemon 실행에 대한 문제점

global 로 패키지를 설치했을 때 설치 경로가 윈도우 기반으로 작성되었음

이를
```
npm config get prefix
```

로 확인 가능했으며

```
/Users/khj/Documents/GitHub/capstone/backends-main/C:\Users\User\AppData\Roaming\npm
```

이런 이상한 경로로 글로벌 설치가 이루어 지고 있는 것을 확인했다 따라서

```
npm config set prefix /usr/local 
```

로 글로벌 설치 경로를 변경해 주었다.





성능 최적화 이전
![Alt text](image-1.png)

![Alt text](image-2.png)


성능 최적화 이후

![Alt text](image-3.png)

성능 최적화 이후의 변화는 렌더링 되는 데이터양이 많지 않아서 정확히 식별이 불가함


10000개의 벌크 데이터를 db에 기록한 뒤에 10000개를 렌더링 하는것에 대해서 최적화 이전과 이후를 비교한다.


벌크 데이터를 이용한 최적화 이전 성능 측정

![Alt text](image-4.png)


벌크 데이터를 이용한 최적화 이후 성능 측정

![Alt text](image-5.png)



렌더링 시간이 대폭 줄어든 것을 확인할 수 있다.


서버 성능 테스트

입력 데이터
![Alt text](image-7.png)


1개의 스레드를 사용하여 1개의 커넥트를 1초간 유지하여 백엔드 성능 측정
![Alt text](image-8.png)


10개의 스레드를 생성하여 100개의 커넥트를 30초간 유지하여 백엔드 성능 측정

![Alt text](image-9.png)