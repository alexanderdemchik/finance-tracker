export class Queue<T> {
  private queue: Array<T>;
  private limit: number;

  constructor(limit: number) {
    this.queue = new Array<T>();
    this.limit = limit;
  }

  // Add an element to the end of the queue; if the queue is full, remove the first element to make room
  enqueue(item: T): void {
    if (this.queue.length < this.limit) {
      this.queue.push(item);
    } else {
      this.queue.shift();
      this.queue.push(item);
    }
  }

  // Remove an element from the front of the queue
  dequeue(): T | undefined {
    if (this.queue.length === 0) {
      return undefined;
    }

    return this.queue.shift();
  }

  // Check the front of the queue
  front(): T | undefined {
    if (this.queue.length === 0) {
      return undefined;
    }

    return this.queue[0];
  }

  get(i: number): T | undefined {
    return this.queue[i];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
