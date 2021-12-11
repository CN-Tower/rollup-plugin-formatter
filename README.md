# rollup-plugin-formatter

[![npm](https://img.shields.io/npm/v/rollup-plugin-formatter.svg)](https://www.npmjs.com/package/rollup-plugin-formatter) 

A code editor and comments formatter plugin of rollup, 一个rollup代码修改和格式化注释的插件

## Install 安装
```bash
# 使用npm安装
npm install rollup-plugin-formatter -D

# 使用yarn安装
yarn add rollup-plugin-formatter -D
```

## Usage 使用
```js
// rollup.config.js
import formatter from 'rollup-plugin-formatter';

export default {
  // ... other options
  plugins: [
    // ... other plugins
    formatter(),
  ],
};
```

## Interface 接口
```ts
/**
 * The formatter plugin options, 格式化插件参数
 */
interface FormatterOptions {
  /**
   * 是否保留License注释，默认不保留
   */
  ignoreLicense: boolean;
  /**
   * Filter files, 过滤函数
   */
  filter: (id: string, code: string) => boolean;
  /**
   * Customer handler, 自定义处理函数，将覆盖默认处理
   */
  newHandler: (code: string, id: string) => string;
  /**
   * Before handler, 前置处理函数
   */
  beforeHandler: (code: string, id: string) => string;
  /**
   * After handler, 后置处理函数
   */
  afterHandler: (code: string, id: string) => string;
}

/**
 * The formatter plugin entrance, 格式化插件入口
 */
declare function formatter(options?: FormatterOptions): Plugin;
```