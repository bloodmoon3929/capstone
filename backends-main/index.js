const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");
const app = express();
const conn = db.init();


app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// 일반적으로 클라이언트에 보낸 요청에 대한 응답이 정상적인 경우
// 여기서는 로그인이 완료된 경우 백엔드에서 클라이언트로 보내는 코드
// status 200번

// 클라이언트에서 보낸 요청의 일부는 존재하고 일부가 존재하지 않는 경우
// 여기에서는 클라이언트의 이메일 은 맞고 패스워드가 틀린겨우 
// status 401번

// 이메일조차 데이터베이스에 존재하지 않는 경우
// 404 -> 401로 숨길 수 있음


app.post('/login', function(req, res) {
    console.log('/login');
    // console.log(req.body);
    const {email, password} = req.body;
    // console.log(`name : ${name}, states : ${states}`);
    const query='SELECT uid from usertable where email = ? AND password = ?';
    conn.query(query,[email, password],(error, rows, fields) => {
    //conn.query('SELECT * from usertable', (error, rows, fields) => {
      if(rows.length > 0) {
        ///정상적인 응답의 경우
        res.status(200);
      } else {
        ///비정상적인 응답의 경우
        res.status(401);
      }


       if(error) {
        console.log("EEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRR");
        throw error;
       }
       console.log('User info is : ', rows);
       res.send(rows);

    });
});

app.post('/signup', function(req, res){
  console.log('/signup');
  const {email, password, uid} = req.body;
  console.log(email, password, uid);

  const query='SELECT email from usertable where email = ?';

  conn.query(query,[email],(e,result,field)=>{
    if(result.length>0)//email이 중복될 때
    {
      res.status(401);
    }
    else//중복이 없을때
    {
      console.log('db에 저장함');
      const query2 = 'INSERT INTO usertable (email, password, uid) VALUES (?, ?, ?)';

      conn.query(query2,[email, password, uid],(err,resu)=>{
        if(err) {
          res.status(500).send("Error while inserting data");
          return;
        }
        res.status(200);
      });
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