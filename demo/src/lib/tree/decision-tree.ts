import { DecisionTree } from '@tykit-learn/tree';

const main = async () => {
  const X = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const y = [1, 2, 3];

  const predX = [
    [7, 8, 9],
    [1, 2, 3],
    [4, 5, 6],
  ];

  const decisionTree = new DecisionTree();
  decisionTree.fit(X, y);
  const result = decisionTree.predict(predX);
  console.log(result);
};

main()
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.error('[MAIN]', err);
  });
