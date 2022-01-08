var testFolder = 'data';
var fs = require('fs');

fs.readdir(testFolder, function(eroor, filelist){
    console.log(filelist);
})