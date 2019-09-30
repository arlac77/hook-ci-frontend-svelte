
export class Node {
  constructor(name, options) {
    Object.definedProperties(this, { name: { value: name } });
  }
}
