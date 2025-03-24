import { DiscountCalculatorPipe } from './discount-calculator.pipe';

describe('DiscountCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new DiscountCalculatorPipe();
    expect(pipe).toBeTruthy();
  });
});
