import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(() => {
    pipe = new DurationPipe()
  })

  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should be return 1h 30min when value is 90min', () => {
    const value : string = "90";
    const result : string  = pipe.transform(value);

    expect(result).toBe("1h 30min");
  });
});
