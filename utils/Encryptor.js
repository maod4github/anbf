var Crypto = require('crypto');

function Encryptor() {}

Encryptor.md5 = function (str) {
  // md5算法 (不是标准算法) (返回32个字符) [
  var md5 = Crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
  // ]
};

Encryptor.sha1 = function (str) {
  // 安全散列算法 (Secure Hash Algorithm) (返回40个字符) [
  var sha1 = Crypto.createHash('sha1');
  sha1.update(str);
  return sha1.digest('hex');
  // ]
};

Encryptor.strong = function (str) {
  return this.md5(this.sha1(str));
};

module.exports = Encryptor;
