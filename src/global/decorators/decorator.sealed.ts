/*
 *  Class Decorator ::
 *    - A Class Decorator is declared just before a class declaration.
 *    - The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition.
 *    - A class decorator cannot be used in a declaration file
 *
 */

function customDec<T extends { new (...args: any[]): {} }>(constructor: T) {
  class MyClass extends constructor {
    // - class constructor area ...
    static __timing = [];
  }

  // - class prototype can be added/modified like this
  MyClass.prototype.foo = function () {
    console.log('foo');
  };

  return MyClass;
}

/**
 * When @sealed is executed, it will seal both the constructor and its prototype,
 * It will therefore prevent any further functionality from being added to or removed from this class
 */

export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
