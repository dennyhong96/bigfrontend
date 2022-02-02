class MyPromise {
  constructor(executor) {
    this.executor = executor;
    this.rejections = [];
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    // this.onRejected = onRejected;
    if (onRejected) {
      this.rejections.push(onRejected);
    }
    this.executor(MyPromise.resolve.bind(this), MyPromise.reject.bind(this));
    return this;
  }

  catch(onRejected) {
    this.rejections.push(onRejected);
    return this;
  }

  static resolve(value) {
    this.onFulfilled(value);
  }

  static reject(value) {
    this.rejections.forEach((rejection) => rejection(value));
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => reject(5), 1000);
})
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )
  .catch((error) => console.log(error));
