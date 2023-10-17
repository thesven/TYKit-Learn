import { DecisionTree } from './base-tree';

export class DecisionTreeRegressor extends DecisionTree {
  public override predict(X: number[][]): number[] {
    return X.map((sample) => this.predictSample(sample));
  }

  protected calculateVariance(y: number[]): number {
    const mean = y.reduce((a, b) => a + b, 0) / y.length;
    return y.reduce((a, b) => a + (b - mean) ** 2, 0) / y.length;
  }

  protected override calculateSplitScore(
    leftY: number[],
    rightY: number[],
    criterion: string
  ): number {
    const leftVariance = this.calculateVariance(leftY);
    const rightVariance = this.calculateVariance(rightY);
    const leftSize = leftY.length;
    const rightSize = rightY.length;
    const totalSize = leftSize + rightSize;

    if (criterion === 'mse') {
      return (leftVariance * leftSize + rightVariance * rightSize) / totalSize;
    } else if (criterion === 'mae') {
      const leftMean = leftY.reduce((a, b) => a + b, 0) / leftSize;
      const rightMean = rightY.reduce((a, b) => a + b, 0) / rightSize;
      return (
        (leftY.reduce((a, b) => a + Math.abs(b - leftMean), 0) +
          rightY.reduce((a, b) => a + Math.abs(b - rightMean), 0)) /
        totalSize
      );
    } else {
      throw new Error(`Unknown criterion: ${criterion}`);
    }
  }
}
