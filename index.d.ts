import { Plugin } from "rollup";

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

export = formatter;
