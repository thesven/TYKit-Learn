export class TreeNode {
  public left: TreeNode | null;
  public right: TreeNode | null;
  public featureIndex: number | null;
  public threshold: number | null;
  public value: number;

  constructor(
    left: TreeNode | null,
    right: TreeNode | null,
    featureIndex: number | null,
    threshold: number | null,
    value: number
  ) {
    this.left = left;
    this.right = right;
    this.featureIndex = featureIndex;
    this.threshold = threshold;
    this.value = value;
  }
}
