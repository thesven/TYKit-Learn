import { TreeNode } from './tree-node';
describe('TreeNode', () => {
  // Create a new instance of TreeNode with valid parameters.
  it('should create a new instance of TreeNode with valid parameters', () => {
    const left = new TreeNode(null, null, null, null, 0);
    const right = new TreeNode(null, null, null, null, 0);
    const featureIndex = 1;
    const threshold = 0.5;
    const value = 1;

    const treeNode = new TreeNode(left, right, featureIndex, threshold, value);

    expect(treeNode.left).toBe(left);
    expect(treeNode.right).toBe(right);
    expect(treeNode.featureIndex).toBe(featureIndex);
    expect(treeNode.threshold).toBe(threshold);
    expect(treeNode.value).toBe(value);
  });

  // Create a new instance of TreeNode with null values for left and right.
  it('should create a new instance of TreeNode with null values for left and right', () => {
    const left = null;
    const right = null;
    const featureIndex = 1;
    const threshold = 0.5;
    const value = 1;

    const treeNode = new TreeNode(left, right, featureIndex, threshold, value);

    expect(treeNode.left).toBe(left);
    expect(treeNode.right).toBe(right);
    expect(treeNode.featureIndex).toBe(featureIndex);
    expect(treeNode.threshold).toBe(threshold);
    expect(treeNode.value).toBe(value);
  });

  // Create a new instance of TreeNode with null values for featureIndex and threshold.
  it('should create a new instance of TreeNode with null values for featureIndex and threshold', () => {
    const left = new TreeNode(null, null, null, null, 0);
    const right = new TreeNode(null, null, null, null, 0);
    const featureIndex = null;
    const threshold = null;
    const value = 1;

    const treeNode = new TreeNode(left, right, featureIndex, threshold, value);

    expect(treeNode.left).toBe(left);
    expect(treeNode.right).toBe(right);
    expect(treeNode.featureIndex).toBe(featureIndex);
    expect(treeNode.threshold).toBe(threshold);
    expect(treeNode.value).toBe(value);
  });

  // Create a new instance of TreeNode with null values for left and right, and non-null values for featureIndex and threshold.
  it('should create a new instance of TreeNode with null values for left and right, and non-null values for featureIndex and threshold', () => {
    const left = null;
    const right = null;
    const featureIndex = 1;
    const threshold = 0.5;
    const value = 1;

    const treeNode = new TreeNode(left, right, featureIndex, threshold, value);

    expect(treeNode.left).toBe(left);
    expect(treeNode.right).toBe(right);
    expect(treeNode.featureIndex).toBe(featureIndex);
    expect(treeNode.threshold).toBe(threshold);
    expect(treeNode.value).toBe(value);
  });

  // Create a new instance of TreeNode with null values for featureIndex and threshold, and non-null values for left and right.
  it('should create a new instance of TreeNode with null values for featureIndex and threshold, and non-null values for left and right', () => {
    const left = new TreeNode(null, null, null, null, 0);
    const right = new TreeNode(null, null, null, null, 0);
    const featureIndex = null;
    const threshold = null;
    const value = 1;

    const treeNode = new TreeNode(left, right, featureIndex, threshold, value);

    expect(treeNode.left).toBe(left);
    expect(treeNode.right).toBe(right);
    expect(treeNode.featureIndex).toBe(featureIndex);
    expect(treeNode.threshold).toBe(threshold);
    expect(treeNode.value).toBe(value);
  });
});
