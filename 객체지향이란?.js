
var park_ji_sung = {
    name : "Park Ji Sung",
    height : 178,
    weight : 70,
    position : "RW",
    team : "Queen's Park Rangers"
};

console.log(park_ji_sung)

var SoccerPlayer = function () { };

SoccerPlayer.prototype = { 
	name: String,
	age: Number,
	height: Number,
	weight: Number,
	position: String,
	team : String
};

var park_ji_sung = new SoccerPlayer(); 

park_ji_sung.name = "Park Ji Sung"; 
park_ji_sung.age = 31;
park_ji_sung.height = 178;
park_ji_sung.weight = 70;

console.log(park_ji_sung);



function Man() {
	this.name = "Anonymous";
	this.gender = "Man";
	this.Run = function () {
		return this.name + " is running!";
	}
	this.Sleep = function () {
		return this.name + " is sleeping!";
} }

function SoccerPlayer () { 
	this.base = new Man();
	this.name = "Anonymous Soccer Player"; 
	this.Run = function () {
		return this.base.Run();
	}
	this.Pass = function () {
		return this.name + " is passing to other player!";
} }

SoccerPlayer.prototype = new Man();
var player = new SoccerPlayer ();

console.log(player.name);
// "Anonymous Soccer Player"

console.log(player. gender);
// "Man"

console.log(player.Run());
// "Anonymous is running!"

console.log(player.Pass());
// "Anonymous Soccer Player is passing to other player!"

console.log(player.Sleep());
// "Anonymous Soccer Player is sleeping!"



function SoccerPlayer() { 
    this.position = "Forward";
  }
var VanPersie = new SoccerPlayer();
// "Forward"

function SoccerPlayer(name, position) { 
  this.name = name;
  this.position = position; 
  this.whatIsYourName = function () {
    return "My name is " + this.name;
  };
  this.whatIsYourPosition = function () { 
	return "My position is " + this.position;
}; }

var player = new SoccerPlayer("Park Ji Sung", "Wing Forward");

player.whatIsYourName();
// "My name is Park Ji Sung"

player.whatIsYourPosition();
// "My position is Wing Forward"
    
player.constructor;
// Function: SoccerPlayer

function SoccerPlayer(name, position) { 
  this.name = name;
  this.position = position; 
  this.whatIsYourName = function () {
    return 'My name is ' + this.name;
  };
  this.wahtIsYourPosition = function () { 
	return 'My position is ' + this.position;
  }; 
}

var player2 = new player.constructor("Koo Ja Cheol");
player2.name;
// "Koo Ja Cheol"


player instanceof SoccerPlayer;
// true

player instanceof Object;
// true

// const와 let은 블록 레벨 스코프, var와 같은 전통적인 자바스크립트의 변수는 함수 레벨 스코프라는 사실을 꼭 기억해두어라.
var a = 1;

function outer() {
	var b = 2;
	console.log(a); // 1
	
	function inner() {
		var c = 3;
		console.log(b);
		console.log(a); 
	}
	
	inner();  // 2 1
}
outer();

console.log(c);  // c is not defined
// 위의 코드를 살펴보면, a는 전역공간에서 선언되었기 때문에 함수 inner와 outer에서 사용할 수 있지만, 변수 c는 함수 내부 블록에서 선언되었기 때문에 함수의 밖인 전역범위에서는 인식하지 못합니다. outer 함수에서도 c 변수는 사용하지 못합니다. 하지만 inner 함수 안에서는 상위 스코프인 b 변수와 a 변수 모두 사용할 수 있습니다.
// inner 함수에서는 a변수를 참조할 때 먼저 자기 자신의 스코프에서 a를 찾고, 없으면 상위 스코프인 outer 함수의 스코프에서 a를 찾고, 거기에도 없으면 또다시 상위 스코프인 전역 범위 G로 올라가 a를 찾습니다. 최종적으로 전역 스코프에도 찾는 변수가 없으면 not defined 에러를 출력합니다. 이렇게 계속해서 체인처럼 꼬리에 꼬리를 물고 상위 스코프를 참조하기 때문에 스코프 체인이라고 이름이 붙여졌습니다.

var text = 'global';

function foo() {
	console.log(text);
}

function bar() {
	var text = 'bar';
	foo();
}

bar(); // 무엇이 출력될까요?

// text 변수가 "global"에서 "bar"로 바뀌었으니, 당연히 "bar"가 출력될 것 같지 않으신가요?
// 하지만 실행하면 "global"이 출력됩니다. foo에서 출력한 text는 bar 함수의 지역 변수 text가 아니라 전역 변수 text를 가르키고 있기 때문입니다. 위에 설명했던 스코프 체인과도 연관이 있는 개념인데요, 먼저 foo 함수에서 text를 참조할 때 자기 자신의 스코프에서 text를 먼저 찾아보고, 없기 때문에 상위 스코프인 전역 스코프에서 text를 찾아서 출력하게 됩니다. 여기까지는 이해가 금방 되실 겁니다.
// 그런데 문제는, bar 함수에서 foo 함수를 불러온다는 겁니다. 그렇다면 foo 함수는 text를 참조해야 하니까, 상위 스코프인 bar 함수에서 text를 찾을 거라고 생각할 수 있지만, 아까 위에서 얘기했듯이 "어디서 호출하는지가 아니라 처음 선언되었을 때에 어떤 스코프에 있는지"가 중요합니다. 즉, 스코프란 코드를 실행하면서 바뀌는 것이 아니라 처음 작성한 그 스코프로 결정된다는 것입니다.
// 따라서 foo는 bar에서 호출되든 어떤 함수 안에서 호출되든지 상관없이, 무조건 자기 자신의 스코프를 찾아보고 그 이후에는 전역 스코프를 찾는다는 것입니다. 이제 조금 이해가 되시나요? 이렇게 foo가 한번 선언된 이상 전역변수 text를 참조하는 것을 바꿀 수 없습니다. 만약 text를 bar로 바꾼 후에 출력하고 싶다면, 지역변수 var를 선언할 것이 아니라 전역변수 var의 값을 바꾸면 됩니다. 이렇게요.

var text = 'global';

function foo() {
    console.log(text);
}

function bar() {
    text = 'bar';
    foo();
}

bar();

function foo() {
    // var a;
	console.log(a);  // undefined
	var a = 100;
	console.log(a);  // 100
}

foo();


foo();

function foo() {
	console.log('출력');
}
// 위와 같은 코드의 경우, 변수 호이스팅과 마찬가지로 함수선언이 위로 끌어올려지기 때문에 제대로 동작합니다. 하지만 아래와 같은 함수 표현식의 경우에는 오류가 발생합니다.

foo();  // foo is not a function

var foo = function() {
	console.log('출력');
};

// 위의 코드는 아래와 같은 코드 이기 때문에 오류가 남
var foo;

foo();  // foo is not a function

foo = function() {
	console.log('출력');
};

// 위와 같이 foo 선언을 위로 호이스팅 해버리기 때문에, foo가 실행될 때는 아직 변수로 선언이 된 상태일 뿐인 것입니다. 따라서 foo는 함수가 아니라는 에러 메세지를 보게 됩니다.
// 이 호이스팅은 혼란스러울 수 있기 때문에, 함수를 호출하기 전에 최상단에 선언하는 습관을 들여야 합니다.

// 클로저 "외부 함수의 실행이 끝나고 외부 함수가 소멸된 이후에도 내부 함수가 외부 함수의 변수에 접근할 수 있는 구조"
// 좀 더 쉽게 얘기하자면, 자신의 고유 스코프를 가진 상태로 소멸하지 않고 외부 함수에 의해 호출되는 함수를 만드는 것이 바로 클로저입니다.

var num = 1;

function foo() {
	var num = 2;
	
	function bar() {
		console.log(num);
	}
	return bar;
}

var baz = foo();
baz();

// "foo() 함수는 리턴되어 사라진 후에 내부 함수 bar가 생성되는 것인데, 여전히 내부함수인 bar가 외부함수인 foo의 지역변수에 접근할 수 있을까?"
// 물론 위의 코드를 보시면 아시겠지만, 가능합니다. 이렇게 외부함수가 리턴되어 사라져야 하는데 사라지지 않고 내부함수의 참조로 인해 값을 유지하게 되는 것을 클로저라고 부릅니다. 위의 코드는 간단한 편이지만, 이것도 클로저라고 할 수 있습니다. 
// 정확히는 내부 함수를 클로저 함수라고 부릅니다. 위 코드와 같은 경우에는 bar()가 클로저 함수가 되겠지요.
// 이런 것이 클로저의 가장 기초적인 예제 코드입니다. 다음으로 조금 더 어려운 코드를 살펴봅시다. 실행하기 전에 어떤 값이 출력될지 미리 생각해보세요.

function f(arg) {
	var n = function() {
		return arg; 
	}
	arg++;
	return n; 
}

var m = f(123); 
console.log(m());

// 언뜻 보기에는 10번 라인의 f(123)을 실행하게 되면 함수 n에서 이미 arg를 반환하였기 때문에 n이 가지는 범위에서 arg 값은 123이라고 생각할 수 있습니다. 
// 하지만 함수 n은 함수 f의 범위에 있는 것을 참조하고 있기 때문에 함수 f에서 모든 처리가 끝나고 나서야 함수 n이 처리됩니다.
// 따라서 f(123)는 124가 되게 됩니다. 
// 위와 비슷한 예제를 한 번 더 볼까요? for 문을 이용한 예시인데, 클로저를 배울 때 for 문을 이용하는 것이 가장 직관적이기 때문에 많이 사용됩니다. 

function f() {
    var a = [];
    var i;
	
    for(i = 0; i < 3; i++){
      a[i] = function() {
        return i;
        }
    }
    return a;
  }
  
  var b = f();

  console.log( b[0]() ); 
  console.log( b[1]() ); 
  console.log( b[2]() ); 

// 위의 코드를 실행하면 당연히 0 1 2 가 차례대로 출력될 것 같습니다. 그런데 실제로 실행해보면 3 3 3 이 출력됩니다.
  a[i] = function() {
    return i;
}
// 는 함수 선언만 된 것이고, 실제로 이 함수가 실행되는 것은 console.log( b[0]() ); 줄에서인데, var b = f(); 
// 문장에서 for 문의 실행이 다 끝나고 나서야 실제 참조가 이루어지게 됩니다. 
// 따라서 i 값이 이미 3으로 증가했기 때문에 전부 3이 출력되는 것입니다. 
// 즉, 클로저는 그 순간의 값을 저장하는 것이 아니라 연결된 함수 범위에서 최종 처리된 값을 가지게 됩니다.
// 그럼 클로저를 이용해서 정상적으로 0 1 2 가 출력되게 하려면 어떻게 해야 하는지 아래 코드를 통해 살펴보겠습니다.

function f() {
    var a = [];
    var i;
	
    for(i = 0; i < 3; i++){
      a[i] = (function(x) { 
        return function() {
          return x;
        }
      })(i);
    }
    return a;
  }
  
var b = f();

console.log( b[0]() );
console.log( b[1]() );
console.log( b[2]() );

// function 내부의 변수인 i를 바로 리턴하지 않고, 파라미터를 받는 function을 정의한 다음에 파라미터로 내부 변수 i를 넘겨서 클로저가 내부 변수 i가 아니라 파라미터를 리턴하도록 하는 방법입니다.
// function f() 내부에서 a[i] = (function(x) { ... })(i); 로 파라미터를 받는 함수를 이미 실행시켰다는 것에 주의해야 합니다. 파라미터는 0, 1, 2를 차례로 받게 되고, 
// 나중에 console.log( b[0]() )를 실행하더라도 파라미터를 기억하고 있다가 0, 1, 2를 차례로 리턴하게 됩니다.
// 보통 함수 내에서 사용된 지역 변수는 해당 함수의 실행이 종료되면 파기되는 것인데, 이와 같이 클로저 함수에 의해 계속 참조되고 있는 경우에는 해당 지역 변수를 파기하지 않고 계속 보관하고 있는 것입니다.