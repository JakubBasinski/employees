// autobind decorator

export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethode = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethode.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
