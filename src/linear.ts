export class Lin<T> {
  #value: T;
  #alreadyRead: boolean;

  constructor(value: T) {
    this.#value = value;
    this.#alreadyRead = false;
  }

  read(): T {
    if (this.#alreadyRead) {
      throw Error('Cannot read the linear value twice.');
    }
    const value: T = this.#value;
    this.#alreadyRead = true;
    return value;
  }
}

export type LUnit = Lin<undefined>;
export type LZero = Lin<void>;
export type LFun<T1, T2> = Lin<(_: T1) => T2>;
export type LPair<T1, T2> = Lin<[T1, T2]>;
