var Encryptor = require('./utils/Encryptor.js');

var str = 'qwe123';

var a = Encryptor.md5(str);

console.log(a, a.length);

var b = Encryptor.sha1(str);

console.log(b, b.length);

var c = Encryptor.strong(str);

console.log(c, c.length);


