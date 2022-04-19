// var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}];
// Users.push({name:'티아라', age:23});
// console.log('사용자수 : %d', Users.length);
// console.log('첫 번째 사용자 이름 : ', Users[0].name);

// var add = function(a,b){
//     return a + b;
// }

// Users.push(add);
// console.log('배열 요소의 수 : %d', Users.length);
// console.log('세 번째 요소로 추가된 함수 실행 : %d', Users[2](10,10));

// var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}];
// console.log('배열 요소의 수 : %d', Users.length);
// for(var i = 0; i<Users.length; i++){
//     console.log('배열요쇼 #' + i + ' : %s', Users[i].name);
// }


// var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}];
// console.log('\nforEach 구문 사용하기');
// Users.forEach(function(item,index){
//     console.log('배열요소 #' + index + ' : %s', item.name);
// })

var Users = [{name:'소녀시대', age:20}, {name:'걸스데이', age:22}, {name:'티아라', age:23}];
Users.splice(1,0,{name:'애프터스쿨', age:26});
console.log('splic로 요소를 인덱스 1에 추가한 후');
console.dir(Users);
Users.splice(2,1);
console.log('splic로 인덱스 2의 요소를 1개 삭제한 후');
console.dir(Users);
var Users2 = Users.slice(2,4);
console.log(Users2);