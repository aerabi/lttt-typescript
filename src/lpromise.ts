import { Lin } from './linear';

export class LPromise<T> {
  #promise: Promise<Lin<T>>;

  private constructor(promise: Promise<Lin<T>>) {
    this.#promise = promise;
  }

  static fromLinearValue<T>(value: Lin<T>): LPromise<T> {
    return new LPromise<T>(Promise.resolve(value));
  }

  static fromValue<T>(value: T): LPromise<T> {
    return LPromise.fromLinearValue(new Lin(value));
  }

  static fromPromise<T>(promise: Promise<T>): LPromise<T> {
    return new LPromise(promise.then(value => new Lin(value)));
  }

  bind<U>(transformation: (_: T) => U): LPromise<U> {
    return LPromise.fromPromise(this.#promise.then(a => transformation(a.read())));
  }

  flatBind<U>(transformation: (_: T) => LPromise<U>): LPromise<U> {
    return new LPromise(this.#promise.then(a => transformation(a.read()).#promise));
  }

  catch(onReject: (error: any) => void): LPromise<void> {
    this.#promise.catch(onReject);
    return LPromise.fromPromise(Promise.resolve());
  }
}
