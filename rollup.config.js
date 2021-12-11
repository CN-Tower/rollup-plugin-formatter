import babel from '@rollup/plugin-babel';
import formatter from './src/index.js';
import pkg from './package.json';

const banner = `\
/*!
 * rollup-plugin-formatter@${pkg.version}
 * A code editor and comments formatter plugin of rollup, 一个rollup代码修改和格式化注释的插件
 */`;

const getConfig = format => ({
  input: 'src/index.js',
  plugins: [
    babel(),
    formatter()
  ],
  output: {
    file: `formatter${format === 'es' ? '.esm' : '.cjs'}.js`,
    format,
    banner: banner,
    name: 'formatter',
    exports: 'auto',
  },
});

export default [
  getConfig('es'),
  getConfig('cjs'),
];
