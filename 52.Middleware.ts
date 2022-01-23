type Request = Record<any, any>;
type NextFunc = (error?: any) => void;
type MiddlewareFunc = (req: Request, next: NextFunc) => void;
type ErrorHandler = (error: Error, req: Request, next: NextFunc) => void;
type RequestHandler = MiddlewareFunc | ErrorHandler;

class Middleware {
  private requestHandlers: RequestHandler[];
  private req: Request;

  constructor() {
    this.requestHandlers = [];
    this.req = {};
  }

  public use(func: MiddlewareFunc | ErrorHandler) {
    this.requestHandlers.push(func);
  }

  public start(req?: Request) {
    if (req) this.req = req;
    this.next();
  }

  private next(error?: any): void {
    const requestHandler = this.requestHandlers.shift();
    if (!requestHandler) return;
    try {
      // 2 args = MiddlewareFunc | 3 args = ErrorHandler
      if (requestHandler.length === 2) {
        // If error passed in, call this.next() immediately. This will now keep on shifting funcs
        // until we have an ErrorHandler function with 3 args
        if (error) return this.next(error);

        // No error passed in, execute the MiddlewareFunc
        (requestHandler as MiddlewareFunc)(this.req, this.next.bind(this));
      } else {
        (requestHandler as ErrorHandler)(error, this.req, this.next.bind(this));
      }
    } catch (err) {
      // Handle when there's an error executing the requestHandler. Call this.next()
      // This will now keep on shifting funcs until we have an ErrorHandler function with 3 args
      this.next(err);
    }
  }
}

// Example
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
