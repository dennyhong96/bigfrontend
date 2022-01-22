type Request = Record<any, any>;

type NextFunc = (error?: any) => void;

type MiddlewareFunc = (req: Request, next: NextFunc) => void;

type ErrorHandler = (error: Error, req: Request, next: NextFunc) => void;

class Middleware {
  private callbacks: (MiddlewareFunc | ErrorHandler)[];
  private req: Request;

  constructor() {
    this.callbacks = [];
    this.req = {};
  }

  public use(func: MiddlewareFunc | ErrorHandler) {
    this.callbacks.push(func);
  }

  // trigger all functions with a req object
  public start(req: Request) {
    this.req = req;
    this.next(); // start off the chain
  }

  private next(error?: any): void {
    const funcToExecute = this.callbacks.shift();
    if (!funcToExecute) return;
    try {
      // 2 args = Callback, 3 args = ErrorHandler
      if (funcToExecute.length === 2) {
        // If error passed in, call this.next() immediately. This will now keep on dequeuing funcs queue
        // till we have an ErrorHandler function with 3 args
        if (error) return this.next(error);

        // No error passed in, execute the callback
        (funcToExecute as MiddlewareFunc)(this.req, this.next.bind(this));
      } else {
        (funcToExecute as ErrorHandler)(error, this.req, this.next.bind(this));
      }
    } catch (error) {
      // Handle when there's an error executing the callback. Call this.next() immediately.
      // This will now keep on dequeuing funcs queue till we have an ErrorHandler function with 3 args
      this.next(error);
    }
  }
}

const middleware = new Middleware();
middleware.use((error: any, req: Request, next: NextFunc) => {
  req.a = 1;
  next();
});
middleware.use((error: any, req: Request, next: NextFunc) => {
  req.b = 2;
  next();
});
middleware.use((req: Request, next: NextFunc) => {
  console.log(req);
});
middleware.start({});
// {a: 1, b: 2}

export {};
