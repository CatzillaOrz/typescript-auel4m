/*
 **  autobind [decortator]
 **
 **
 */
export function AutoBind(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFn = originalMethod.bind(this);
      return bindFn;
    },
  };
  return adjustedDescriptor;
}
