import { TreeNode } from './tree-node';

/**
 * Provides DecisionTreeRegressor options.
 */
export interface DecisionTreeOptions {
  maxDepth?: number;
  minSamplesSplit?: number;
  minSamplesLeaf?: number;
  minWeightFractionLeaf?: number;
  maxFeatures?: number;
  maxLeafNodes?: number;
  minImpurityDecrease?: number;
  ccpAlpha?: number;
  criterion?: string;
}

/**
 * Provides a decision tree Base
 */
export class DecisionTree {
  public maxDepth: number;
  public minSamplesSplit: number;
  public minSamplesLeaf: number;
  public minWeightFractionLeaf: number;
  public maxFeatures: number;
  public maxLeafNodes: number;
  public minImpurityDecrease: number;
  public ccpAlpha: number;
  public criterion: string;

  protected root: TreeNode | undefined = undefined;

  /**
   * Creates a new DecisionTreeRegressor.
   * @param options DecisionTreeRegressor options
   */
  constructor(options: DecisionTreeOptions = {}) {
    this.maxDepth = options.maxDepth || Infinity;
    this.minSamplesSplit = options.minSamplesSplit || 2;
    this.minSamplesLeaf = options.minSamplesLeaf || 1;
    this.minWeightFractionLeaf = options.minWeightFractionLeaf || 0;
    this.maxFeatures = options.maxFeatures || 1;
    this.maxLeafNodes = options.maxLeafNodes || Infinity;
    this.minImpurityDecrease = options.minImpurityDecrease || 0;
    this.ccpAlpha = options.ccpAlpha || 0;
    this.criterion = options.criterion || 'mse';
  }

  /**
   * Fits the decision tree on a data set
   * @param {number[][]}X the training data
   * @param {number[]} y the target values
   * @returns {void}
   */
  public fit(X: number[][], y: number[]): void {
    const nSamples = X.length;
    console.log(
      '>>>>>>>> Fitting DecisionTreeRegressor with',
      nSamples,
      'samples'
    );
    const nFeatures = X[0].length;
    const featureIndexes = [];
    for (let i = 0; i < nFeatures; i++) {
      featureIndexes.push(i);
    }

    this.root = this.buildTree(X, y, featureIndexes, 0);
  }

  /**
   * Predicts target values for a data set
   * @param {number[][]} X the data set to predict for
   * @returns {number[]} the predicted target values
   */
  public predict(X: number[][]): number[] {
    return X.map((sample) => this.predictSample(sample));
  }

  protected predictSample(sample: number[]): number {
    if (!this.root) {
      throw new Error('Tree not built');
    }

    let node: TreeNode | null = this.root;
    while (node && node.left) {
      if (
        sample[node.featureIndex!] &&
        node.threshold !== null &&
        sample[node.featureIndex!] <= node.threshold
      ) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    if (!node) {
      throw new Error('Invalid node');
    }
    return node.value;
  }

  protected buildTree(
    X: number[][],
    y: number[],
    featureIndexes: number[],
    depth: number
  ): TreeNode {
    const nSamples = X.length;
    const nFeatures = X[0].length;

    if (
      depth >= this.maxDepth ||
      nSamples < this.minSamplesSplit ||
      nSamples < 2 * this.minSamplesLeaf ||
      nSamples < this.minWeightFractionLeaf * nSamples ||
      featureIndexes.length === 0 ||
      this.maxLeafNodes <= 1
    ) {
      return new TreeNode(null, null, null, null, this.calculateValue(y));
    }

    const impurity = this.calculateImpurity(y);
    if (impurity <= this.minImpurityDecrease) {
      return new TreeNode(null, null, null, null, this.calculateValue(y));
    }

    let bestScore = -Infinity;
    let bestFeatureIndex = -1;
    let bestThreshold = NaN;
    let bestLeftX: number[][] = [];
    let bestLeftY: number[] = [];
    let bestRightX: number[][] = [];
    let bestRightY: number[] = [];

    if (this.maxFeatures < nFeatures) {
      featureIndexes = this.shuffle(featureIndexes).slice(0, this.maxFeatures);
    }

    for (const featureIndex of featureIndexes) {
      const featureValues = X.map((sample) => sample[featureIndex]);
      const thresholds = this.unique(featureValues).sort();

      if (thresholds.length > this.minSamplesLeaf) {
        for (let i = 0; i < thresholds.length - 1; i++) {
          const threshold = (thresholds[i] + thresholds[i + 1]) / 2;
          const leftIndexes = [];
          const rightIndexes = [];

          for (let j = 0; j < nSamples; j++) {
            if (X[j][featureIndex] <= threshold) {
              leftIndexes.push(j);
            } else {
              rightIndexes.push(j);
            }
          }

          const leftX = leftIndexes.map((index) => X[index]);
          const leftY = leftIndexes.map((index) => y[index]);
          const rightX = rightIndexes.map((index) => X[index]);
          const rightY = rightIndexes.map((index) => y[index]);

          if (
            leftY.length >= this.minSamplesLeaf &&
            rightY.length >= this.minSamplesLeaf
          ) {
            const score = this.calculateSplitScore(
              leftY,
              rightY,
              this.criterion
            );
            if (score > bestScore) {
              bestScore = score;
              bestFeatureIndex = featureIndex;
              bestThreshold = threshold;
              bestLeftX = leftX;
              bestLeftY = leftY;
              bestRightX = rightX;
              bestRightY = rightY;
            }
          }
        }
      }
    }

    if (bestFeatureIndex === -1) {
      return new TreeNode(null, null, null, null, this.calculateValue(y));
    }

    const left = this.buildTree(
      bestLeftX,
      bestLeftY,
      featureIndexes,
      depth + 1
    );
    const right = this.buildTree(
      bestRightX,
      bestRightY,
      featureIndexes,
      depth + 1
    );

    return new TreeNode(
      left,
      right,
      bestFeatureIndex,
      bestThreshold,
      this.calculateValue(y)
    );
  }

  protected calculateImpurity(y: number[]): number {
    if (this.criterion === 'mse') {
      const mean = y.reduce((a, b) => a + b, 0) / y.length;
      return y.reduce((a, b) => a + (b - mean) ** 2, 0) / y.length;
    } else if (this.criterion === 'mae') {
      const median = this.percentile(y, 50);
      return y.reduce((a, b) => a + Math.abs(b - median), 0) / y.length;
    } else {
      throw new Error(`Unknown criterion: ${this.criterion}`);
    }
  }

  protected calculateValue(y: number[]): number {
    if (this.criterion === 'mse') {
      return y.reduce((a, b) => a + b, 0) / y.length;
    } else if (this.criterion === 'mae') {
      return this.percentile(y, 50);
    } else {
      throw new Error(`Unknown criterion: ${this.criterion}`);
    }
  }

  protected calculateSplitScore(
    leftY: number[],
    rightY: number[],
    criterion: string
  ): number {
    const leftImpurity = this.calculateImpurity(leftY);
    const rightImpurity = this.calculateImpurity(rightY);
    const leftSize = leftY.length;
    const rightSize = rightY.length;
    const totalSize = leftSize + rightSize;

    if (criterion === 'mse') {
      return (leftImpurity * leftSize + rightImpurity * rightSize) / totalSize;
    } else if (criterion === 'mae') {
      const leftMedian = this.percentile(leftY, 50);
      const rightMedian = this.percentile(rightY, 50);
      return (
        (leftY.reduce((a, b) => a + Math.abs(b - leftMedian), 0) +
          rightY.reduce((a, b) => a + Math.abs(b - rightMedian), 0)) /
        totalSize
      );
    } else {
      throw new Error(`Unknown criterion: ${criterion}`);
    }
  }

  protected shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  protected unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  protected percentile(array: number[], p: number): number {
    if (array.length === 0) {
      throw new Error('Percentile of empty array is undefined');
    }
    if (p < 0 || p > 100) {
      throw new Error(`Percentile ${p} is out of range [0, 100]`);
    }
    const sorted = array.slice().sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    if (index % 1 === 0) {
      return sorted[index];
    } else {
      const lower = sorted[Math.floor(index)];
      const upper = sorted[Math.ceil(index)];
      return lower + (upper - lower) * (index % 1);
    }
  }
}
