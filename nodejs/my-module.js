// my-module.js

var myModule = { 
  name: "Shin",
  age: 25,
  aboutMe: function(){
    console.log("Hi, my name is " + this.name + " and I'm " + this.age + " year's old.");
  } 
};

module.exports = myModule;