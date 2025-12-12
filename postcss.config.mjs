import postcssFunctions from 'postcss-functions';
import postcssImport from 'postcss-import';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import fns from './src/assets/js/functions.js';

export default {
  plugins: [
    postcssFunctions({
      functions: fns,
    }),
    postcssImport(),
    postcssGlobalData({
      files: ['src/styles/global/custom_media.css'],
    }),
    postcssCustomMedia(),
    postcssPresetEnv({ stage: 1 }),
    autoprefixer(),
  ],
};
