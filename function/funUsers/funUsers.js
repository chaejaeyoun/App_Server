var express = require('express');
var router = express.Router();
var dbconfig   = require('../../dbconfig/userdb');
var mysql      = require('mysql');
var connection = mysql.createConnection(dbconfig);
var bcrypt = require('bcrypt');
var mysql      = require('mysql');


var fn = {};
fn.userinfo =  function (req, res, next) {
  var sql = 'SELECT * FROM user_data' ;

  connection.query(sql,function(err, result) {
    if(!err){
      res.send(result);
    } else {
      console.log('Error');
      res.render('index', {title:'Error'});
    }
  });
}


fn.signup = function (req, res, next) {
  var sql_insert = 'INSERT INTO user_data (id, password, name) VALUES(?,?,?)';
  var sql_check = 'SELECT * FROM user_data WHERE `id`= ? '
  const saltRounds = 5;

  var
   new_id = req.body.newid,
   new_pw_hash = bcrypt.hashSync(req.body.newpw, saltRounds),
   params = [new_id, new_pw_hash , req.body.newname ,req.body.newage, req.body.newsex];


   connection.query(sql_check, new_id, function (err, result) {
     if (err) {
         console.log('err :' + err);
         return res.json({success: false, msg: err});
       }else {
         if (result.length != 0) {
           console.log('아이디 중복!' );
           return res.json({success: false, msg: '아이디 중복입니다.'});
         }
       }
       console.log('id check - pass');

    connection.query(sql_insert,params, function (err, result) {
      // console.log(new_pw_hash);
     if(err){
       console.log(err);
        res.json({success: false, msg: err});
      }
      else{
        console.log('새로운 아이디가 생성되었습니다. ==> ' + new_id);
        res.json({success: true, msg: 'signup success'});
      }
    });
  });
}

/* login - passport 적용 전 코드*/
// fn.signin = function (req, res, next) {
//   var sql_select = 'SELECT * FROM `customer_info` WHERE `id`= ? ' ;
//
//   var
//     user_id = req.body.userid,
//     password = req.body.password;
//
//   connection.query(sql_select, user_id, function(err, result) {
//     console.log(result);
//     if (err) {
//       console.log('err :' + err);
//       res.send('에러!');
//     }else {
//       if (result.length === 0) {
//         res.json({success: false, msg: '해당 유저가 존재하지 않습니다.'})
//         console.log('아이디 오류!' );
//       } else {
//         if(!bcrypt.compareSync(password, result[0].pw)) {
//           console.log('비밀번호 오류');
//           return done(false, null)
//           res.json({success: false, msg: '비밀번호가 일치하지 않습니다.'})
//         } else {
//           console.log('success login');
//           // res.json({success: true})
//           res.send('true');
//         }
//       }
//     }
//   });
// }
module.exports = fn;
