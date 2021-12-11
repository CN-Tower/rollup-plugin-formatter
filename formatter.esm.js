/*!
 * rollup-plugin-formatter@1.0.2
 * A code editor and comments formatter plugin of rollup, 一个rollup代码修改和格式化注释的插件
 */
import MagicString from 'magic-string';

var isFun = function isFun(value) {
  return typeof value === 'function';
};

/**
 * A code editor and comments formatter plugin of rollup, 一个rollup代码修改和格式化注释的插件
 */
var formatter = function formatter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      ignoreLicense = _ref.ignoreLicense,
      filter = _ref.filter,
      newHandler = _ref.newHandler,
      beforeHandler = _ref.beforeHandler,
      afterHandler = _ref.afterHandler;

  return {
    name: 'formatter',
    transform: function transform(code, id) {
      var result = code;
      var isFormat = isFun(filter) ? filter(id, code) : true;

      // 根据过滤函数判断是否格式化
      if (isFormat) {
        // 前置处理
        if (isFun(beforeHandler)) {
          result = beforeHandler(result, id);
        }

        // 执行自定义处理函数
        if (isFun(newHandler)) {
          result = newHandler(result, id);
        }

        // 执行默认对注释的处理
        else {
          result = result
          // -去除多行注释后面的空行
          .replace(/\*\/(?:\r|\n)+(\s*\w*)/g, '*/\r\n$1')
          // -去除多行注释前面留一个空行
          .replace(/(?:\r|\n)+(\s*\/\*\*)/g, '\r\n\r\n$1')
          // -行尾的双斜杆注释优化
          .replace(/(?<!^\s*\*.*?)(;|})\s?(\/\/.*)(?:[\r|\n]*)(\s*)/g, '$1\r\n\r\n$3$2\r\n$3')
          // -带中划线的注释强制换行，如本行
          .replace(/(?<![\r\n])\s*(\/\/\s?-.*)(?:[\r|\n]*)(\s*)/g, '\r\n$2$1\r\n$2')
          // -去除双斜杆注释后面的空行
          .replace(/(\s*\/\/\s.*)(?:[\r|\n]*)/g, "$1\r\n");

          if (!ignoreLicense) {
            // 去除微软License声明
            result = result.replace(/\/\*!(?=((?<!\*\/)(?:\r|\n|.)*?THE SOFTWARE IS PROVIDED "AS IS"))(?:\r|\n|.)*?\*\/(?:\r|\n|\s)*/g, '');
          }
        }

        // 后置处理
        if (isFun(afterHandler)) {
          result = afterHandler(result, id);
        }
      }

      var ms = new MagicString(code);
      return {
        code: result,
        map: ms.generateMap({
          hires: true
        })
      };
    }
  };
};

export { formatter as default };
