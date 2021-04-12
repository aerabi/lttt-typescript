import { Lin } from './linear';

describe('Lin', () => {
  it('Lin should not be readable twice', () => {
    const un = 12;
    const lin = new Lin(un);
    expect(lin.read()).toEqual(un);
    expect(() => lin.read()).toThrowError();
  });
});
