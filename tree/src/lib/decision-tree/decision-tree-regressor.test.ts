import { it, expect, describe } from 'vitest';
import { DecisionTreeRegressor } from './decision-tree-regressor';

describe('DecisionTreeRegressor', () => {
  // Fit and predict on a simple dataset
  it('should fit and predict on a simple dataset', () => {
    const X: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y: number[] = [10, 20, 30];

    const decisionTreeRegressor = new DecisionTreeRegressor();
    decisionTreeRegressor.fit(X, y);

    const testX: number[][] = [
      [2, 3, 4],
      [5, 6, 7],
    ];
    const predictions: number[] = decisionTreeRegressor.predict(testX);
    console.log('>>>>>>>> predictions', predictions);
    expect(predictions).toEqual([10, 20]);
  });

  // Fit and predict on a larger dataset
  it('should fit and predict on a larger dataset', () => {
    const X: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
    ];
    const y: number[] = [10, 20, 30, 40, 50];

    const decisionTreeRegressor = new DecisionTreeRegressor();
    decisionTreeRegressor.fit(X, y);

    const testX: number[][] = [
      [2, 3, 4],
      [5, 6, 7],
      [11, 12, 13],
    ];
    const predictions: number[] = decisionTreeRegressor.predict(testX);

    expect(predictions).toEqual([10, 20, 40]);
  });

  // Fit and predict on a dataset with multiple features
  it('should fit and predict on a dataset with multiple features', () => {
    const X: number[][] = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y: number[] = [10, 20, 30];

    const decisionTreeRegressor = new DecisionTreeRegressor();
    decisionTreeRegressor.fit(X, y);

    const testX: number[][] = [
      [2, 3, 4],
      [5, 6, 7],
    ];
    const predictions: number[] = decisionTreeRegressor.predict(testX);

    expect(predictions).toEqual([10, 20]);
  });

  // Fit and predict on a dataset with one sample
  it('should fit and predict on a dataset with one sample', () => {
    const X: number[][] = [[1, 2, 3]];
    const y: number[] = [10];

    const decisionTreeRegressor = new DecisionTreeRegressor();
    decisionTreeRegressor.fit(X, y);

    const testX: number[][] = [[2, 3, 4]];
    const predictions: number[] = decisionTreeRegressor.predict(testX);

    expect(predictions).toEqual([10]);
  });
});
