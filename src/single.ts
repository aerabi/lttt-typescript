import { Lin } from './linear';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, mergeMap, single } from 'rxjs/operators';

export class Single<T> {
  #observable: Observable<Lin<T>>;

  private constructor(observable: Observable<Lin<T>>) {
    this.#observable = observable;
  }

  static fromLinearValue<T>(value: Lin<T>): Single<T> {
    return new Single<T>(of(value));
  }

  static fromValue<T>(value: T): Single<T> {
    return Single.fromLinearValue(new Lin(value));
  }

  static fromPromise<T>(promise: Promise<T>): Single<T> {
    const linearObservable = fromPromise(promise).pipe(map(val => new Lin(val)));
    return new Single(linearObservable);
  }

  static fromObservable<T>(observable: Observable<T>): Single<T> {
    const linearSingleObservable = observable.pipe(
      single(),
      map(val => new Lin(val)),
    );
    return new Single(linearSingleObservable);
  }

  bind<U>(transformation: (_: T) => U): Single<U> {
    return Single.fromObservable(this.#observable.pipe(map(a => transformation(a.read()))));
  }

  flatBind<U>(transformation: (_: T) => Single<U>): Single<U> {
    return new Single(this.#observable.pipe(mergeMap(a => transformation(a.read()).#observable)));
  }

  catch(onReject: (error: any) => void): Single<T> {
    const caught: Observable<Lin<T>> = this.#observable.pipe(
      catchError(error => {
        onReject(error);
        return of<Lin<T>>();
      }),
    );
    return new Single<T>(caught);
  }

  exec(consume: (_: T) => void): void {
    this.#observable.subscribe(a => consume(a.read()));
  }
}
