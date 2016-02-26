function ResInfo(code, msg, data) {
  this.code = code == null ? 0 : code;
  this.msg = msg == null ? '' : msg;
  this.data = data;
}

ResInfo.prototype.set = function (code, msg, data) {
  this.code = code;
  this.msg = msg;
  this.data = data;
  return this;
};

ResInfo.prototype.reset = function () {
  this.code = 0;
  this.msg = '';
  this.data = null;
  return this;
};

module.exports = ResInfo;
