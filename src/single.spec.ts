import { Single } from './single';

describe('Single', () => {
  it('bind', (done) => {
    const single = Single.fromValue(12);
    single
      .bind((x) => x * 2)
      .bind((x) => expect(x).toEqual(24))
      .bind(done);
  });

  it('bind twice', () => {
    expect.assertions(2);
    const single = Single.fromValue(12);
    single.bind((x) => expect(x).toEqual(12));
    single.bind(_ => {}).catch(error => expect(error).toBeTruthy());
  });
});
