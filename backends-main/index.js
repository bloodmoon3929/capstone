const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'FDSF412QWE32';
const bcrypt = require('bcryptjs');



const db = require("./config/mysql.js");

const app = express();

// app.use(cookieParser());

// 토큰 테스트를 위해 주석처리
const conn = db.init();


app.set("port", process.env.PORT || 3001);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/login', function(req, res) {
  console.log('/login');
  const { email, password } = req.body;

  const query = 'SELECT uid, email, password FROM user WHERE email = ?';
  conn.query(query, [email], (error, rows, fields) => {
      if (error) {
          console.log('db관련 오류');
          res.status(500).send('DB error');
          throw error;
      }

      if (rows.length > 0) {
          // 사용자 정보가 존재할 때
          const hashedPassword = rows[0].password;

          bcrypt.compare(password, hashedPassword, (err, result) => {
              if (err) {
                  res.status(500).send('bcrypt 오류');
                  return;
              }

              if (result) {
                  // 비밀번호 일치
                  const token = jwt.sign({ email: rows[0].email, uid: rows[0].uid }, SECRET_KEY, { expiresIn: '1h' });
                  res.status(200).json({ token });
              } else {
                  // 비밀번호 불일치
                  res.status(401).send('Invalid credentials');
              }
          });
      } else {
          // 사용자 정보가 존재하지 않을 때
          res.status(401).send('Invalid credentials');
      }
  });
});

app.post('/lesson/getSearchedLessons', function(req, res) {

  console.log(req);
  const {keyword, type} = req.body;
  console.log(`keyword : ${keyword}, type : ${type}`);
  const query=`SELECT app.index, subject, professor, number, score, time, time2, time3 from app where ${type} like '%${keyword}%'`;
  console.log(query);
  conn.query(query, (err, rows, fields)=>{
    console.log(rows);
    let status;
      if(rows.length > 0) {
        ///정상적인 응답의 경우
        ///쿼리문을 통해서 email하고 uid를 받아 res로 전달함
        status = 200;
      } else {
        ///비정상적인 응답의 경우 401
        ///기존의 데이터베이스의 내용과 기록하려는 내용이 일치하는 경우 409 conflict(추후 개발)
        status = 401;
      }


      if(err) {
        console.log("error in search lesson");
        throw err;
       }
       if(status == 200) {
        res.status(status).send(rows);
       } else {
        res.status(status).send();
       }
  })
});


app.post('/api/save', function(req, res) {
  console.log('/savelesson')
  const {lessons, uid} =req.body;
  console.log(lessons);
  const jLessons = JSON.stringify(lessons);
  console.log(jLessons);
  const query=`UPDATE user SET data = ? WHERE uid = ?`;
  conn.query(query,[jLessons, uid],(err, rows, fields)=>{

    if(err) {
      res.status(401).send();
    } else {
      res.status(200).send();
    }
  })
});

app.post('/api/init_lesson', function(req, res) {
  console.log('/initlesson')
  const {uid} = req.body;
  const query=`SELECT data FROM user WHERE uid = ?`;
  conn.query(query,[uid],(err, rows, fields)=>{
    let status;
    if(rows.length > 0) {
      status = 200;
    } else {
      status = 401;
    }


    if(err) {
      console.log("error in init");
      throw err;

     }
     if(status == 200) {
      res.status(status).send(rows[0].data);
      return;
     } else {
      res.status(status).send();
      return;
     }

  })
});

app.get('/api/auth-check', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token expired' });
      }
      return res.status(401).send({ message: 'Failed to authenticate token' });
    }

    res.status(200).send(decoded);
  });
});

app.post('/signup', function(req, res){
  console.log('/signup');
  const {email, password, uid} = req.body;
  console.log(email, password, uid);
  const hashedPassword = bcrypt.hashSync(password, 10);

  

  // 토큰 테스트를 위해 주석처리
  const query='SELECT email from user where email = ?';

  conn.query(query,[email],(e,result,field)=>{
    if(result.length>0)//email이 중복될 때
    {
      res.status(401).send({ message: 'Email already exists' });
    }
    else//중복이 없을때
    {
      console.log('db에 저장함');
      const query2 = 'INSERT INTO user (email, password, uid, data) VALUES (?, ?, ?, ?)';

      conn.query(query2,[email, hashedPassword, uid, []],(err,resu)=>{
        if(err) {
          console.error("Error while inserting data", err);
          res.status(500).send("Error while inserting data");
          return;
        }
        const token = jwt.sign({ email, uid }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
      });
    }

  })

  
})

app.post('/api/initUser',function(req,res){
  console.log('initialization of user data');
  const{uid}=req.body;
  console.log(uid);

  const query='SELECT data from user where uid=?';
  conn.query(query,[uid],(err, result, field)=>{
    let status;
    if(result[0].data.length > 0) {
      status = 200;
    } else {
      status = 401;
    }


    if(err) {
      console.log("error in list");
      throw err;

     }
     if(status == 200) {
      res.status(status).send(result[0].data);
      return;
     } else {
      res.status(status).send();
      return;
     }

  })
})

app.post('/api/userlist',function(req,res){
  console.log('initialization of user data');
  const{name}=(req.body);
  console.log(name);

  const query=`SELECT uid, data from user where uid like '%?%' AND JSON_VALID(data)`;
  conn.query(query,[parseInt(name)],(err, result, field)=>{
    let status;
    console.log(result);
    if(result.length > 0) {
      status = 200;
    } else {
      status = 401;
    }


    if(err) {
      console.log("error in list");
      throw err;

     }
     if(status == 200) {
      res.status(status).send(result);
      return;
     } else {
      res.status(status).send();
      return;
     }

  })
})


// // 게시글 목록 보기
// app.get("/view", function (req, res) {
// //   var sql = "select * from board";
// //   conn.query(sql, function (err, result) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else res.send(result);
// //   });
// });

// // 게시글 쓰기
// app.post("/insert", upload.single("img"), function (req, res) {
// //   var body = req.body;
// //   var sql = "SELECT count(*)+1 as bnum FROM board ";
// //   conn.query(sql, function (err, result) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else {
// //       var sql =
// //         "insert into board (bnum,id,title,content,writedate) values(?,?,?,?,NOW())";
// //       var params = [result[0].bnum, body.id, body.title, body.content];
// //       conn.query(sql, params, function (err) {
// //         if (err) console.log("query is not excuted: " + err);
// //         else if (req.file != null) {
// //           // 만약 업로드 된 파일이 있다면
// //           var sql =
// //             "insert into file (bnum,savefile,filetype,writedate) values (?,?,?,now())";
// //           var params = [body.bnum, req.file.originalname, req.file.mimetype];
// //           conn.query(sql, params, function (err) {
// //             if (err) console.log("query is not excuted: " + err);
// //             else res.sendStatus(200);
// //           });
// //         } else res.sendStatus(200);
// //       });
// //     }
// //   });
// });

// // 게시글 보기
// app.get("/read/:bnum", function (req, res) {
// //   var sql = "select * from board where bnum=" + req.params.bnum;
// //   conn.query(sql, function (err, result) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else res.send(result);
// //   });
// });

// // 게시글 수정
// app.post("/update/:bnum", function (req, res) {
// //   var body = req.body;
// //   var sql =
// //     "update board set id=?, title=?, content=? where bnum=" + req.params.bnum;
// //   var params = [body.id, body.title, body.content];
// //   conn.query(sql, params, function (err) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else res.sendStatus(200);
// //   });
// });

// // 게시글 삭제
// app.get("/delete/:bnum", function (req, res) {
// //   var sql = "delete from board where bnum=" + req.params.bnum;
// //   conn.query(sql, function (err) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else res.sendStatus(200);
// //   });
// });

// // 이미지 파일 불러오기
// app.get("/img/:bnum", function (req, res) {
// //   var sql = "select * from file where bnum=" + req.params.bnum;
// //   conn.query(sql, function (err, result) {
// //     if (err) console.log("query is not excuted: " + err);
// //     else if (result.length != 0) {
// //       fs.readFile("uploads/" + result[0].savefile, function (err, data) {
// //         res.writeHead(200, { "Context-Type": "text/html" });
// //         res.end(data);
// //       });
// //     } else res.sendStatus(200);
// //   });
// });

// // 서버 동작중인 표시
app.listen(app.get("port"), app.get("host"), () =>
  console.log(
    "Server is running on : " + app.get("host") + ":" + app.get("port")
  )
);