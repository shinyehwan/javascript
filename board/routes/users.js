// routes/users.js

var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Index // 1 지금까지의 index route과는 다르게, 찾은 값을 정렬하는 기능이 추가되었습니다. 
// sort함수가 추가되었는데요, 이 함수에는 {username:1} 이 들어가서 username을 기준으로 오름차순(asc)으로 정렬하고 있습니다.(-1을 넣으면 내림차순(desc)이 됩니다.)
// sort 함수를 사용하기 위해 구조가 좀 바뀌었는데요, sort함수가 있을 때와 없을 때를 비교해서 살펴봅시다.
// sort가 없을때 (callback 함수가 find 함수에 인자로 들어감)
// User.find({}, function(err, users){
//     ...
//   });
// sort가 있을때 (callback 함수가 exec함수에 인자로 들어감)
  
// User.find({})
//   .sort({username:1})
//   .exec(function(err, users){
//     ...
//   });
//   sort말고도 다양한 함수들이 끼어들 수 있는데요, 이러한 경우에 위와 같이 exec 함수를 사용합니다.
router.get('/', function(req, res){
  User.find({})
    .sort({username:1})
    .exec(function(err, users){
      if(err) return res.json(err);
      res.render('users/index', {users:users});
    });
});

// New
router.get('/new', function(req, res){
  res.render('users/new');
});

// create
router.post('/', function(req, res){
  User.create(req.body, function(err, user){
    if(err) return res.json(err);
    res.redirect('/users');
  });
});

// show
router.get('/:username', function(req, res){
  User.findOne({username:req.params.username}, function(err, user){
    if(err) return res.json(err);
    res.render('users/show', {user:user});
  });
});

// edit
router.get('/:username/edit', function(req, res){
  User.findOne({username:req.params.username}, function(err, user){
    if(err) return res.json(err);
    res.render('users/edit', {user:user});
  });
});

// update // 2
router.put('/:username', function(req, res, next){
  User.findOne({username:req.params.username}) // 2-1 이번에는 findOneAndUpdate함수대신에 findOne함수로 값을 찾은 후에 값을 수정하고 user.save함수로 값을 저장합니다. 
                                               // 단순히 값을 바꾸는 것이 아니라 user.password를 조건에 맞게 바꿔주어야 하기 때문이죠.
    .select('password') // 2-2 select함수를 이용하면 DB에서 어떤 항목을 선택할지, 안할지를 정할 수 있습니다. user schema에서 password의 select을 false로 설정했으니 DB에 password가 있더라도 기본적으로 password를 읽어오지 않게 되는데, select('password')를 통해서 password를 읽어오게 했습니다. 
                        // 참고로 select함수로 기본적으로 읽어오게 되어 있는 항목을 안 읽어오게 할 수도 있는데 이때는 항목이름 앞에 -를 붙이면 됩니다. 또한 하나의 select함수로 여러 항목을 동시에 정할 수도 있는데, 예를 들어 password를 읽어오고, name을 안 읽어오게 하고 싶다면 .select('password -name')를 입력하면 되겠습니다.
    .exec(function(err, user){
      if(err) return res.json(err);

      // update user object
      user.originalPassword = user.password;
      user.password = req.body.newPassword? req.body.newPassword : user.password; // 2-3 user의 update(회원 정보 수정)은 password를 업데이트 하는 경우와, password를 업데이트 하지 않는 경우로 나눌 수 있는데, 이에 따라 user.password의 값이 바뀝니다.
      for(var p in req.body){ // 2-4 user는 DB에서 읽어온 data이고, req.body가 실제 form으로 입력된 값이므로 각 항목을 덮어 쓰는 부분입니다.
        user[p] = req.body[p];
      }

      // save updated user
      user.save(function(err, user){
        if(err) return res.json(err);
        res.redirect('/users/'+user.username);
      });
  });
});

// destroy
router.delete('/:username', function(req, res){
  User.deleteOne({username:req.params.username}, function(err){
    if(err) return res.json(err);
    res.redirect('/users');
  });
});

module.exports = router;