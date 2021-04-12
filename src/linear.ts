export class Lin<T> {
  #value: T | undefined;

  constructor(value: T) {
    this.#value = value;
  }

  read(): T {
    if (this.#value === undefined) {
      throw Error('Cannot read the linear value twice.');
    }
    const value: T = this.#value;
    this.#value = undefined;
    return value;
  }
}

export type LUnit = Lin<undefined>;
export type LZero = Lin<void>;
