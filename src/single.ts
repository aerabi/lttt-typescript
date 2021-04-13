import { Lin } from './linear';

export class Single<T> {
  #promise: Promise<Lin<T>>;

  private constructor(promise: Promise<Lin<T>>) {
    this.#promise = promise;
  }

  static fromValue<T>(value: T): Single<T> {
    return new Single<T>(Promise.resolve(new Lin(value)));
  }

  static fromPromise<T>(promise: Promise<T>): Single<T> {
    return new Single(promise.then((value) => new Lin(value)));
  }

  bind<U>(transformation: (_: T) => U): Single<U> {
    return Single.fromPromise(this.#promise.then((a) => transformation(a.read())));
  }

  catch(onReject: (error: any) => void): Single<void> {
    this.#promise.catch(onReject);
    return Single.fromPromise(Promise.resolve());
  }
}
