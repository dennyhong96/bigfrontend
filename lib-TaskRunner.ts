type Task = (doneCallback: () => void) => void;

export class TaskRunner {
  private maxRunningCount: number;
  private currRunningCount: number;
  private queue: Task[];

  constructor(maxRunningCount = 3) {
    this.maxRunningCount = maxRunningCount;
    this.currRunningCount = 0;
    this.queue = [];
  }

  public push(task: Task): void {
    this.queue.push(task);
    this.run();
  }

  private run(): void {
    // if currRunningCount >= maxRunningCount, we don't execute the task at this time
    while (
      this.currRunningCount < this.maxRunningCount &&
      this.queue.length > 0
    ) {
      this.currRunningCount++;
      const task = this.queue.shift()!;
      task(() => {
        this.currRunningCount--; // when the previous task finishes, we execute next task
        this.run();
      });
    }
  }
}

const task1: Task = (done) => {
  console.log(1);
  setTimeout(() => {
    done();
  }, 3000);
};
const task2: Task = (done) => {
  console.log(2);
  setTimeout(() => {
    done();
  }, 3000);
};
const task3: Task = (done) => {
  console.log(3);
  setTimeout(() => {
    done();
  }, 3000);
};
const task4: Task = (done) => {
  console.log(4);
  setTimeout(() => {
    done();
  }, 3000);
};
const taskRunner = new TaskRunner(2);
taskRunner.push(task1);
taskRunner.push(task2);
taskRunner.push(task3);
taskRunner.push(task4);
