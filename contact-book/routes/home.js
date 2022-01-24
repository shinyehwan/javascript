//routes/home.js
// 위에서 app.use는 route과 콜백 함수를 받는다고 했는데, 우리가 사용할 콜백 함수는 express가 제공하는 router함수 입니다.
var express = require('express');
var router = express.Router(); // 1 express.Router()를 사용해서 router함수를 초기화합니다.

// Home
router.get('/', function(req, res){ // 2 app.get에서 router.get으로 바뀐 것만 빼면 이전코드와 동일합니다. "/"에 get 요청이 오는 경우를 router함수에 설정해 줍니다.
  res.redirect('/contacts');
});

module.exports = router; // 3 module.exports에 담긴 object(여기서는 router object)가 module이 되어require시에 사용됩니다.

