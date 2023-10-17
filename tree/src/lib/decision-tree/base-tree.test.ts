import { DecisionTree } from './base-tree';

describe('DecisionTree', () => {
  // fit and predict with valid input
  it('should fit and predict with valid input', () => {
    const X = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y = [1, 2, 3];
    const decisionTree = new DecisionTree();
    decisionTree.fit(X, y);
    const result = decisionTree.predict(X);
    expect(result).toEqual(y);
  });

  // fit and predict with multiple samples
  it('should fit and predict with multiple samples', () => {
    const X = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y = [1, 2, 3];
    const decisionTree = new DecisionTree();
    decisionTree.fit(X, y);
    const result = decisionTree.predict(X);
    expect(result).toEqual(y);
  });

  // fit and predict with multiple features
  it('should fit and predict with multiple features', () => {
    const X = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y = [1, 2, 3];
    const decisionTree = new DecisionTree();
    decisionTree.fit(X, y);
    const result = decisionTree.predict(X);
    expect(result).toEqual(y);
  });

  // fit and predict with empty target
  it('should fit and predict with empty target', () => {
    const X = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const y: number[] = [];
    const decisionTree = new DecisionTree();
    decisionTree.fit(X, y);
    const result = decisionTree.predict(X);
    expect(result).toEqual([NaN, NaN, NaN]);
  });
});
