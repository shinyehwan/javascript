var members = ['shinyehwan', 'k8805', 'jghisjl007'];
console.log(members[1]); // k8805

var i = 0;
while(i<members.length){
    console.log('array loop', members[i]);
    i = i+1;

}

var roles={
    'programmer' : 'shinyehwan',
    'designer' : 'k8805',
    'manager' : 'jghisjl007'
}
console.log(roles.designer); // k8805
console.log(roles['designer']); // k8805

for(var name in roles){
    console.log('object => ', name, 'value => ', roles[name]);
}