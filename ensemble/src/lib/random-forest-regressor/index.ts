/**
 * Provides RandomForestRegressor Options
 */
export interface RandomForestRegressorOptions {
  numberOfEstimators: number;
  criterion: 'squared_error' | 'absolute_error' | 'friedman_mse' | 'poisson';
  maxDepth: number;
  minSamplesSplit: number;
  minSamplesLeaf: number;
  minWeightFractionLeaf: number;
  maxFeatures: number;
  maxLeafNodes: number | undefined;
  minImpurityDecrease: number;
  bootstrap: boolean;
  oobScore: boolean;
  nJobs: number;
  randomState: number;
  verbose: number;
  warmStart: boolean;
  ccpAlpha: number;
  maxSamples: number | undefined;
}

/**
 * Provides default settings for the RandomForestRegressor
 */
export const randomForestRegressorOptionsDefaults: RandomForestRegressorOptions =
  {
    numberOfEstimators: 100,
    criterion: 'squared_error',
    maxDepth: 2,
    minSamplesSplit: 2,
    minSamplesLeaf: 1,
    minWeightFractionLeaf: 0,
    maxFeatures: 1,
    maxLeafNodes: undefined,
    minImpurityDecrease: 0,
    bootstrap: true,
    oobScore: false,
    nJobs: 1,
    randomState: 0,
    verbose: 0,
    warmStart: false,
    ccpAlpha: 0,
    maxSamples: undefined,
  };

/**
 * Provides RandomForestRegressor
 */
export class RandomForestRegressor {
  public constructor(
    protected readonly options: RandomForestRegressorOptions
  ) {}

  /**
   * fits the model on a dataset building a forest of trees from the X and y values
   * @param {{number[][]}} X The training input samples
   * @param {{number[][]}} y The target values
   * @returns RandomForestRegressor
   */
  public fit(X: number[][], y: number[][]): RandomForestRegressor {
    //build a forest of trees from the training set (X, y)

    return this;
  }
}
