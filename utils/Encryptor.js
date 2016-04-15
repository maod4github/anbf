var Crypto = require('crypto');

// 加密器
function Encryptor() {}

// md5算法(不是标准算法),返回32个字符
Encryptor.md5 = function (str) {
  var md5 = Crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

// 安全散列算法(Secure Hash Algorithm),返回40个字符
Encryptor.sha1 = function (str) {
  var sha1 = Crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('hex');
};

// 增强的加密,先sha1,再md5,返回32个字符
Encryptor.strong = function (str) {
  return this.md5(this.sha1(str));
};

module.exports = Encryptor;
