import { MillionDollarsPipe } from './million-dollars.pipe';

describe('BudgetMoviePipe', () => {
  let pipe: MillionDollarsPipe;

  beforeEach(() => {
    pipe = new MillionDollarsPipe()
  })

  it('create an instance', () => {
    const pipe = new MillionDollarsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should be return $230 million when value is 230', () => {
    const valueToTransform : string = "230";
    const result : string = pipe.transform(valueToTransform);

    expect(result).toBe("$230 million");
  });

  it('should ', () => {


  });
});
