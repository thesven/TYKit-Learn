/**
 * @module StandardScaler /lib/standard-scaler
 * @description Standardize features by removing the mean and scaling to unit variance
 */

/**
 * @interface StandardScalerOptions
 * @description StandardScaler options
 */
export interface StandardScalerOptions {
  copy: boolean;
  with_mean: boolean;
  with_std: boolean;
}

/**
 * @class StandardScaler
 * @description Standardize features by removing the mean and scaling to unit variance
 * @see https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html
 */
export class StandardScaler {
  protected mean_: number = 0;
  protected scale_: number = 1;

  public constructor(protected readonly options: StandardScalerOptions) {}

  /**
   * @method fit
   * @description Compute the mean and standard deviation to be used for later scaling
   * @param data the data to fit the scaler with
   * @returns {StandardScaler} the fitted scaler
   */
  public fit(data: number[]): StandardScaler {
    this.mean_ = this.mean(data);
    this.scale_ = this.standardDeviation(data);
    return this;
  }

  /**
   * @method transform
   * @description Perform standardization by centering and scaling
   * @param data the data to transform
   * @returns {number[]} the transformed data
   */
  public transform(data: number[]): number[] {
    if (this.options.copy) {
      data = [...data];
    }

    return this.standardize(
      data,
      this.options.with_mean,
      this.options.with_std
    );
  }

  /**
   * @method fitTransform
   * @description Fit to data, then transform it
   * @param data the data to fit and transform
   * @returns {number[]} the transformed data
   */
  public fitTransform(data: number[]): number[] {
    return this.fit(data).transform(data);
  }

  /**
   * @method inverseTransform
   * @description Scale back the data to the original representation
   * @param data the data to inverse transform
   * @returns {number[]} the inverse transformed data
   */
  public inverseTransform(data: number[]): number[] {
    if (this.options.copy) {
      data = [...data];
    }

    let m = this.mean_;
    let s = this.scale_;

    return data.map((x) => x * s + m);
  }

  public getMean(): number {
    return this.mean_;
  }

  public getStdDev(): number {
    return this.scale_;
  }

  /**
   * @method mean
   * @param data
   * @returns number
   */
  private mean(data: number[]): number {
    let sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  }

  /**
   * @method standardDeviation
   * @param data
   * @returns number
   */
  private standardDeviation(data: number[]): number {
    let m = this.mean_;
    let variance =
      data.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / data.length;
    return Math.sqrt(variance);
  }

  /**
   * @method standardize
   * @param data
   * @param with_mean
   * @param with_std
   * @returns number[]
   */
  private standardize(
    data: number[],
    with_mean = true,
    with_std = true
  ): number[] {
    let m = with_mean ? this.mean_ : 0;
    let s = with_std ? this.scale_ : 1;

    if (s === 0) {
      return data.map(() => 0);
    }
    return data.map((x) => (x - m) / s);
  }
}
