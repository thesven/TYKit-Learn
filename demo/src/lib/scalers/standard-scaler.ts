import { StandardScaler, StandardScalerOptions } from '@tykit-learn/scalers';

const main = async () => {
  const X = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const scaler = new StandardScaler({
    with_mean: true,
    with_std: true,
  } as StandardScalerOptions);
  scaler.fit(X);
  const result = scaler.transform(X);
  console.log(result);
};

main()
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.error('[MAIN]', err);
  });
