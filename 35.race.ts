function race<T>(promises: Promise<T>[]): Promise<T> {
  let result: T;
  let error: any;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          if (result || error) return;
          result = res;
          return resolve(result);
        })
        .catch((err) => {
          if (result || error) return;
          error = err;
          return reject(error);
        });
    });
  });
}
