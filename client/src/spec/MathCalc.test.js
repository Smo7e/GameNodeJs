import MathCalc from '../modules/Math/MathCalc';

describe('MathCalc', () => {
  it('should match the snapshot', () => {
    const mathCalc = new MathCalc();
    expect(mathCalc).toMatchSnapshot();
  });
});
