export function Time() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const t0 = performance.now();
      const v = originalMethod.apply(this, args);
      const t1 = performance.now();
      console.log(`${propertyKey}: ${t1 - t0} ms`);
      return v;
    };
  };
}
