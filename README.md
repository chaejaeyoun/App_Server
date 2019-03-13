# App_Server
fuse 예제에 활용하기 위한 server

--------------------------------
dbconfig 폴더에 있는 tempdb.js 와 userdb.js는 mysql과 연동하기 위한 모듈로 mysql의 root계정임.

function 폴더 안에 기능이 담김.
funUsers.js 안의 fn.signup함수로 중복 확인 후 db에 저장.

passport.js는 세션을 위한 파일

routes 포더의 users.js가 회원가입과 로그인 부분으로 fuse와 연결
