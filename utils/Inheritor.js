// 继承器
function Inheritor() {
  if (!Object.create) {
    Object.create = function (proto) {
      function F() {}
      F.prototype = proto;
      return new F();
    };
  }
}

// 继承方法,childClass-子类,parentClass-父类
// 举个例子: Inheritor.inherit(Student, Person);
Inheritor.inherit = function (childClass, parentClass) {
  // 这种方式是目前最佳的JS继承实现方式
  childClass.prototype = Object.create(parentClass.prototype);
};

module.exports = Inheritor;
