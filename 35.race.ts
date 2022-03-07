function race<T>(promises: Promise<T>[]): Promise<T> {
  let finished = false;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((res) => {
          if (finished) return;
          finished = true;
          return resolve(res);
        })
        .catch((err) => {
          if (finished) return;
          finished = true;
          return reject(err);
        });
    });
  });
}
