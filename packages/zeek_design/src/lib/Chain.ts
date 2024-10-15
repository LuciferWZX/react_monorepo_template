import { nanoid } from "nanoid";
import { sleep } from "@/lib/utils.ts";

export class Chain {
  private queue: Array<{ id: string; fn: Function }> = [];
  private readonly id: string;
  constructor() {
    this.id = nanoid(10);
  }
  //方法可以在数组的末属添加一个或多个元素
  async push(fn: Function) {
    this.queue.push({
      id: nanoid(10),
      fn,
    });
    return this;
  }
  //方法把数组中的最后一个元素删除
  async pop() {
    this.queue.pop();
    return this;
  }
  //方法把数组中的第一个元素删除
  async shift() {
    this.queue.shift();
    return this;
  }
  async unshift() {
    this.queue.unshift();
    return this;
  }
  async execute(fn: (chainId: string) => Promise<void> | void) {
    await fn(this.id);
    return this;
  }
  async repeatExecute(
    repeat: number,
    fn: (chainId: string) => Promise<void> | void,
    config?: {
      delay?: number;
      isFirstDelay?: boolean;
    },
  ) {
    for (let i = 0; i < repeat; i++) {
      const delay = config?.delay ?? 1000;
      if (config?.isFirstDelay && i === 0) {
        await this.sp(delay);
      }
      await this.execute(fn);
      if (i < repeat - 1) {
        await this.sp(delay);
      }
    }
    return this;
  }
  async sp(ms: number) {
    await sleep(ms);
    return this;
  }
}
