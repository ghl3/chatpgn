import { Engine } from "./Engine";

export class EngineGroup {
  index: number;
  items: Engine[];

  constructor(items: any[]) {
    this.index = 0;
    this.items = items;
  }

  get = () => {
    const item = this.items[this.index];
    this.index += 1;
    if (this.index >= this.items.length) {
      this.index = 0;
    }
    return item;
  };
}
