import { eslint } from '@zeroqs/eslint';

export default eslint(
  {
    typescript: true,
    stylistic: true,
    rules: {
      'node/prefer-global/process': 'off'
    }
  }
);
