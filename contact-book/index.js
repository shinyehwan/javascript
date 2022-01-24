// index.js

var express = require('express');
var mongoose = require('mongoose');
var methodOverride = require('method-override'); // method-override module을 methodOverride변수에 담습니다
var bodyParser = require('body-parser'); // body-parser module를 bodyPaser 변수에 담습니다.
var app = express(); 

// DB setting
mongoose.connect(process.env.MONGO_DB); // 1  node.js에서 기본으로 제공되는 process.env 오브젝트는 환경변수들을 가지고 있는 객체입니다. 
                                        // 저는 DB connection string을 "MONGO_DB"라는 이름의 환경변수에 저장하였기 때문에 node.js코드상에서 process.env.MONGO_DB로 해당 값을 불러올 수 있습니다.
                                        // mongoose.connect('CONNECTION_STRING')함수를 사용해서 DB를 연결할 수 있습니다.
var db = mongoose.connection; //2 mongoose의 db object를 가져와 db변수에 넣는 과정입니다. 이 db변수에는 DB와 관련된 이벤트 리스너 함수들이 있습니다

//3 db가 성공적으로 연결된 경우 "DB connected"를 출력합니다.
db.once('open', function(){
  console.log('DB connected');
});

//4 db연결중 에러가 있는 경우 "DB ERROR : " 와 에러를 출력합니다.
// DB연결은 앱이 실행되면 단 한번만 일어나는 이벤트 입니다. 
// 그러므로 db.once('이벤트_이름',콜백_함수) 함수를 사용했고, error는 DB접속시 뿐만 아니라, 
// 다양한 경우에 발생할 수 있기 때문에 db.on('이벤트_이름',콜백_함수)함수를 사용합니다.
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); // bodyParser를 사용하기 위해 필요한 코드들입니다. json 형식의 데이터를 받는다는 설정이고, 
app.use(bodyParser.urlencoded({extended:true})); // urlencoded data를 extended 알고리듬을 사용해서 분석한다는 설정입니다. 2번을 설정하면, route의 callback함수(function(req, res, next){...})의 req.body에서 form으로 입력받은 데이터를 사용할 수 있습니다.
app.use(methodOverride('_method')); // _method의 query로 들어오는 값으로 HTTP method를 바꿉니다. 예를들어 http://example.com/category/id?_method=delete를 받으면 _method의 값인 delete을 읽어 해당 request의 HTTP method를 delete으로 바꿉니다.
// DB schema 
// mongoose.Schema 함수로 DB에서 사용할 schema를 설정합니다. 데이터베이스에 정보를 어떠한 형식으로 저장할 지를 지정해 주는 부분입니다. 
// contact라는 형태의 데이터를 DB에 저장할 텐데, 이 contact는 name, email, phone의 항목들을 가지고 있으며 새 항목 모두 String 타입입니다. name은 값이 반드시 입력되어야 하며(required), 값이 중복되면 안된다(unique)는 추가 설정이 있습니다.
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
  });
var Contact = mongoose.model('contact', contactSchema); // mongoose.model함수를 사용하여 contact schema의 model을 생성합니다. 
                                                        // mongoose.model함수의 첫번째 parameter는 mongoDB에서 사용되는 콜렉션의 이름이며, 두번째는 mongoose.Schema로 생성된 오브젝트입니다. DB에 있는 contact라는 데이터 콜렉션을 현재 코드의 Contact라는 변수에 연결해 주는 역할을 합니다.
  
// Routes
// Home // 6 /contacts로 redirect하는 코드입니다.
app.get('/', function(req, res){
    res.redirect('/contacts');
  });
// Contacts - Index // 7 에러가 있다면 에러를 json형태로 웹브라우저에 표시하고, 에러가 없다면 검색 결과를 받아 views/contacts/index.ejs를 render(페이지를 다이나믹하게 제작)합니다.
// Contact.find({}, function(err, contacts){ ... })를 살펴봅시다. 이 부분을 일반화시키면 모델.find(검색조건, callback_함수)로 나타낼 수 있습니다.
// 모델.find(검색조건, 콜백_함수)를 모델.find, 검색조건, 콜백_함수 세부분으로 나누어서 자세히 살펴봅시다.
// - 모델.find 함수는 DB에서 검색조건에 맞는 모델(이 강의에서는 Contact) data(배열)를 찾고 콜백_함수를 호출하는 함수입니다. 
// - 모델.find의 검색조건은 Object 형태로 전달됩니다. 예를들어 {lastName:"Kim"}이라면 모델들 중에 lastName 항목의 값이 "Kim"인 모델들을 찾는 조건이 됩니다. 빈 Object({})를 전달하는 경우(=검색조건 없음) DB에서 해당 모델의 모든 data를 return합니다. 
// - 모델.find의 콜백_함수는 function(에러, 검색결과)의 형태입니다(function(err, contacts){ ... } 부분). 첫번째 parameter인 에러(여기서는 err)는 error가 있는 경우에만 내용이 전달됩니다. 즉 if(err)로 에러가 있는지 없는지를 알 수 있습니다. 
// 두번째 parameter인 검색결과(여기서는 contacts)는 한개 이상일 수 있기 때문에 검색결과는 항상 array이며 심지어 검색 결과가 없는 경우에도 빈 array[]를 전달합니다. 검색결과가 array임을 나타내기 위해 parameter이름으로 contact의 복수형인 contacts를 사용합니다.
app.get('/contacts', function(req, res){
    Contact.find({}, function(err, contacts){
      if(err) return res.json(err);
      res.render('contacts/index', {contacts:contacts});
    });
  });
// Contacts - New // 8 "/contacts/new"에 get 요청이 오는 경우 : 
// 새로운 주소록을 만드는 form이 있는 views/contacts/new.ejs를 render합니다.
app.get('/contacts/new', function(req, res){
    res.render('contacts/new');
});
// Contacts - create // 9 "/contacts"에 post 요청이 오는 경우 :
// "/contacts/new"에서 폼을 전달받는 경우입니다. 
// 모델.create은 DB에 data를 생성하는 함수입니다. 첫번째 parameter로 생성할 data의 object(여기서는 req.body)를 받고, 두번째 parameter로 콜백 함수를 받습니다. 
// 모델.create의 callback 함수(여기서는 function(err, contact){ ... } 부분) 는 첫번째 parameter로 error를 받고 두번째 parameter로 생성된 data를 받습니다. 생성된 data는 항상 하나이므로 parameter이름으로 단수형인 contact를 사용하였습니다. 
// 에러없이 contact data가 생성되면 /contacts로 redirect합니다.
app.post('/contacts', function(req, res){
    Contact.create(req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
});
// Contacts - show
// :id처럼 route에 콜론(:)을 사용하면 해당 위치의 값을 받아 req.params에 넣게 됩니다. 
// 예를 들어 "contacts/abcd1234"가 입력되면 "contacts/:id" route에서 이를 받아 req.params.id에 "abcd1234"를 넣게 됩니다.
// Model.findOne은 DB에서 해당 model의 document를 하나 찾는 함수입니다. 첫번째 parameter로 찾을 조건을 object로 입력하고 data를 찾은 후 콜백 함수를 호출합니다. 
// Model.find와 비교해서 Model.find는 조건에 맞는 결과를 모두 찾아 array로 전달하는데 비해 Model.findOne은 조건에 맞는 결과를 하나 찾아 object로 전달합니다. (검색 결과가 없다면 null이 전달됩니다.)
// 위 경우에는 {_id:req.params.id}를 조건으로 전달하고 있는데, 즉 DB의 contacts collection에서 _id가 req.params.id와 일치하는 data를 찾는 조건입니다.
// 에러가 없다면 검색 결과를 받아 views/contacts/show.ejs를 render합니다.
app.get('/contacts/:id', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/show', {contact:contact});
    });
  });
  
// Contacts - edit
// "contacts/:id/edit"에 get 요청이 오는 경우 :
// Model.findOne이 다시 사용되었습니다. 검색 결과를 받아 views/contacts/edit.ejs를 render합니다.
app.get('/contacts/:id/edit', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/edit', {contact:contact});
    });
  });
// Contacts - update
// "contacts/:id"에 put 요청이 오는 경우 :
// Model.findOneAndUpdate는 DB에서 해당 model의 document를 하나 찾아 그 data를 수정하는 함수입니다. 첫번째 parameter로 찾을 조건을 object로 입력하고 두번째 parameter로 update할 정보를 object로 입력data를 찾은 후 callback함수를 호출합니다. 
// 이때 callback함수로 넘겨지는 값은 수정되기 전의 값입니다. 만약 업데이트 된 후의 값을 보고 싶다면 콜백 함수 전에 parameter로 {new:true}를 넣어주면 됩니다.
// Data 수정 후 "/contacts/"+req.params.id로 redirect합니다.
app.put('/contacts/:id', function(req, res){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts/'+req.params.id);
    });
  });
// Contacts - destroy
// "contacts/:id"에 delete 요청이 오는 경우 :
// Model.deleteOne은 DB에서 해당 model의 document를 하나 찾아 삭제하는 함수입니다. 
// 첫번째 parameter로 찾을 조건을 object로 입력하고 data를 찾은 후 callback함수를 호출합니다.
// Data 삭제후 "/contacts"로 redirect합니다.
app.delete('/contacts/:id', function(req, res){
    Contact.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
  });
  



// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});