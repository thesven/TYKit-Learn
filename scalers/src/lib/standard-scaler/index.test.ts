import { StandardScaler } from './index';
import { describe, expect, it } from 'vitest';

describe('StandardScaler', () => {
  // fit and transform data with default options
  it('should fit and transform data with default options', () => {
    const scaler = new StandardScaler({
      copy: false,
      with_mean: true,
      with_std: true,
    });
    const data = [1, 2, 3, 4, 5];
    const expected = [
      -1.414213562373095, -0.7071067811865475, 0, 0.7071067811865475,
      1.414213562373095,
    ];

    const result = scaler.fitTransform(data);
    console.log('[RESULT] :: ', result);

    expect(scaler.fitTransform(data)).toEqual(expected);
  });

  it('should fit and transform data with options copy=false, with_mean=true, with_std=true', () => {
    const scaler = new StandardScaler({
      copy: false,
      with_mean: true,
      with_std: true,
    });
    const data = [1, 2, 3, 4, 5];
    const expected = [
      -1.414213562373095, -0.7071067811865475, 0, 0.7071067811865475,
      1.414213562373095,
    ];

    const result = scaler.fitTransform(data);

    expect(result).toEqual(expected);
  });

  it('should fit and transform data with options copy=true, with_mean=false, with_std=true', () => {
    const scaler = new StandardScaler({
      copy: true,
      with_mean: false,
      with_std: true,
    });
    const data = [1, 2, 3, 4, 5];
    const expected = [
      0.7071067811865475, 1.414213562373095, 2.1213203435596424,
      2.82842712474619, 3.5355339059327373,
    ];

    const result = scaler.fitTransform(data);

    expect(result).toEqual(expected);
  });

  it('should fit and transform data with options copy=true, with_mean=true, with_std=false', () => {
    const scaler = new StandardScaler({
      copy: true,
      with_mean: true,
      with_std: false,
    });
    const data = [1, 2, 3, 4, 5];
    const expected = [-2, -1, 0, 1, 2];

    const result = scaler.fitTransform(data);

    expect(result).toEqual(expected);
  });

  it('should fit and transform empty data', () => {
    const scaler = new StandardScaler({
      copy: true,
      with_mean: true,
      with_std: true,
    });
    const data: number[] = [];
    const expected: number[] = [];

    const result = scaler.fitTransform(data);

    expect(result).toEqual(expected);
  });

  it('should fit and transform data with one element', () => {
    const scaler = new StandardScaler({
      copy: true,
      with_mean: true,
      with_std: true,
    });
    const data = [1];
    const expected = [0];

    const result = scaler.fitTransform(data);
    expect(result).toEqual(expected);
  });
});
