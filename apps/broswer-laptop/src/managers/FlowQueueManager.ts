import { FlowNode } from "@/types";

export class FlowQueueManager {
  queue: FlowNode[] = [];
  private constructor() {}
  public static shared = new FlowQueueManager();

  add(node: FlowNode) {
    this.queue = this.queue.concat(node);
    console.log("已进入队列");
  }
}
