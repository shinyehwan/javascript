var p = {
    v1:'v1',
    v2:'v2',
    f1:function (){
        console.log(this.v1);
    },
    f2:function(){
        console.log(this.v2);
    }

}


p.f1();
p.f2();

// 함수는 값이다
// 객체는 값을 저장하는 그릇이다
// 객체는 결국에는 코드가 복잡해짐에 따라 정리정돈을 통해 복잡성을 낮춰준다