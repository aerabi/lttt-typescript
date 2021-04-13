import { Lin } from './linear';

export class Single<T> {
  #promise: Promise<Lin<T>>;

  private constructor(promise: Promise<Lin<T>>) {
    this.#promise = promise;
  }

  static fromLinearValue<T>(value: Lin<T>): Single<T> {
    return new Single<T>(Promise.resolve(value));
  }

  static fromValue<T>(value: T): Single<T> {
    return Single.fromLinearValue(new Lin(value));
  }

  static fromPromise<T>(promise: Promise<T>): Single<T> {
    return new Single(promise.then(value => new Lin(value)));
  }

  bind<U>(transformation: (_: T) => U): Single<U> {
    return Single.fromPromise(this.#promise.then(a => transformation(a.read())));
  }

  flatBind<U>(transformation: (_: T) => Single<U>): Single<U> {
    return new Single(this.#promise.then(a => transformation(a.read()).#promise));
  }

  catch(onReject: (error: any) => void): Single<void> {
    this.#promise.catch(onReject);
    return Single.fromPromise(Promise.resolve());
  }
}
