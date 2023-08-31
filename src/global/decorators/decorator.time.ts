/**
 *  Method decorator
 *  - A Method Decorator is declared just before a method declaration.
 *  - The decorator is applied to the Property Descriptor for the method, and can be used to observe, modify, or replace a method definition.
 *  - A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context (such as in a declare class).
 */
export function time() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const value = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      const out = await value.apply(this, args);
      const end = performance.now();
      const delay = end - start;
      console.log(`${propertyKey} took ${delay} ms`);
      return out;
    };
  };
}
