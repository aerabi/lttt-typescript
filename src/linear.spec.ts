import { Lin, LUnit } from './linear';

describe('Lin', () => {
  it('Lin should not be readable twice', () => {
    const un = 12;
    const lin = new Lin(un);
    expect(lin.read()).toEqual(un);
    expect(() => lin.read()).toThrowError();
  });

  it('LUnit has one value', () => {
    const unit: LUnit = new Lin(undefined);
  });
});
