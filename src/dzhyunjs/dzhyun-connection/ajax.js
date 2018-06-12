/* eslint-disable */
import XMLHttpRequest from './XMLHttpRequest';
import { param } from './util';

/**
 * 模拟jquery的ajax接口
 */

/**
 * 得到ArrayBuffer类型的响应数据
 * @param xhr
 * @returns {ArrayBuffer}
 */
function getArrayBufferResponse(xhr) {
  if (typeof ArrayBuffer === 'undefined') {
    throw new Error('不支持ArrayBuffer类型');
  } else if (xhr.response instanceof ArrayBuffer) {
    return xhr.response;
  } else {
    const text = xhr.responseText;
    const length = text.length;
    const buf = new ArrayBuffer(length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < length; i += 1) {
      // "& 0xff"，表示在每个字符的两个字节之中，只保留后一个字节，将前一个字节扔掉。原因是浏览器解读字符的时候，会把字符自动解读成Unicode的0xF700-0xF7ff区段。
      // http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html
      // eslint-disable-next-line no-bitwise
      bufView[i] = text.charCodeAt(i) & 0xff;
    }
    return buf;
  }
}

/**
 * 得到Blob类型的响应数据
 * @param xhr
 */
function getBlobResponse(xhr) {
  if (typeof Blob === 'undefined') {
    throw new Error('不支持Blob类型');
  } else if (xhr.response instanceof Blob) {
    return xhr.response;
  } else {
    const buf = getArrayBufferResponse(xhr);

    // TODO 未知类型
    return new Blob([buf]);
  }
}

// 修改自https://github.com/ForbesLindesay/ajax
var jsonpID = 0,
  nodejs = typeof window === 'undefined',
  document = !nodejs && window.document,
  key,
  name,
  rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  scriptTypeRE = /^(?:text|application)\/javascript/i,
  xmlTypeRE = /^(?:text|application)\/xml/i,
  jsonType = 'application/json',
  htmlType = 'text/html',
  blankRE = /^\s*$/;

var ajax = function(options) {
  var settings = Object.assign({}, options || {});
  for (key in ajax.settings)
    if (settings[key] === undefined) settings[key] = ajax.settings[key];

  ajaxStart(settings);

  if (!settings.crossDomain) {
    settings.crossDomain =
      /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) &&
      !nodejs &&
      !!window.location &&
      RegExp.$2 != window.location.host;
  }

  var dataType = settings.dataType,
    hasPlaceholder = /=\?/.test(settings.url);
  if (dataType == 'jsonp' || hasPlaceholder) {
    if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?');
    return ajax.JSONP(settings);
  }

  if (!settings.url)
    settings.url = !nodejs && !!window.location && window.location.toString();
  serializeData(settings);

  var mime = settings.accepts[dataType],
    baseHeaders = {},
    protocol = /^([\w-]+:)\/\//.test(settings.url)
      ? RegExp.$1
      : !nodejs && !!window.location && window.location.protocol,
    xhr = ajax.settings.xhr(),
    abortTimeout;

  if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest';
  else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest();
    xhr.onload = function() {
      xhr.readyState = 4;
      xhr.status = 200;
      xhr.onreadystatechange();
    };
    xhr.error = function() {
      xhr.readyState = 4;
      xhr.status = 400;
      xhr.onreadystatechange();
    };
  }
  if (mime) {
    baseHeaders['Accept'] = mime;
    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
    xhr.overrideMimeType && xhr.overrideMimeType(mime);
  }
  if (
    settings.contentType ||
    (settings.data && settings.type.toUpperCase() != 'GET')
  )
    baseHeaders['Content-Type'] =
      settings.contentType || 'application/x-www-form-urlencoded';
  settings.headers = Object.assign(baseHeaders, settings.headers || {});

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      clearTimeout(abortTimeout);
      var result,
        error = false;
      if (
        (xhr.status >= 200 && xhr.status < 300) ||
        xhr.status == 304 ||
        (xhr.status == 0 && protocol == 'file:')
      ) {
        dataType =
          dataType ||
          mimeToDataType(
            xhr.contentType ||
              (xhr.getResponseHeader && xhr.getResponseHeader('content-type'))
          );

        try {
          if (dataType == 'script') (1, eval)(result);
          else if (dataType == 'xml') result = xhr.responseXML;
          else if (dataType == 'json')
            result = blankRE.test(xhr.responseText)
              ? null
              : JSON.parse(xhr.responseText);
          else if (dataType === 'arraybuffer')
            result = getArrayBufferResponse(xhr);
          else if (dataType === 'blob') result = getBlobResponse(xhr);
          else result = xhr.responseText;
        } catch (e) {
          error = e;
        }

        if (error) ajaxError(error, 'parsererror', xhr, settings);
        else ajaxSuccess(result, xhr, settings);
      } else {
        ajaxError(null, 'error', xhr, settings);
      }
    }
  };

  var async = 'async' in settings ? settings.async : true;
  xhr.open(settings.type, settings.url, async);

  if (dataType == 'arraybuffer' || dataType == 'blob') {
    // 因为IE的问题，只能将设置responseType的操作放在xhr.open之后
    // https://connect.microsoft.com/IE/feedback/details/795580/ie11-xmlhttprequest-incorrectly-throws-invalidstateerror-when-setting-responsetype
    // 判断是否支持设置responseType
    var supported = typeof xhr.responseType === 'string';

    // 支持二进制请求直接设置responseType
    if (supported) {
      // 响应类型默认arraybuffer，可以设置为blob（响应回来使用response取得数据）
      xhr.responseType = options.dataType;
    } else {
      // 不支持则尝试使用用户自定义的字符集方式（响应回来使用responseText取得数据）
      xhr.overrideMimeType
        ? xhr.overrideMimeType('text/plain; charset=x-user-defined')
        : xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
    }
  }

  for (name in settings.headers)
    xhr.setRequestHeader(name, settings.headers[name]);

  if (ajaxBeforeSend(xhr, settings) === false) {
    xhr.abort();
    return false;
  }

  if (settings.timeout > 0)
    abortTimeout = setTimeout(function() {
      xhr.onreadystatechange = empty;
      xhr.abort();
      ajaxError(null, 'timeout', xhr, settings);
    }, settings.timeout);

  // avoid sending empty string (#319)
  xhr.send(settings.data ? settings.data : null);
  return xhr;
};

// trigger a custom event and return false if it was cancelled
function triggerAndReturn(context, eventName, data) {
  return true;
}

// trigger an Ajax "global" event
function triggerGlobal(settings, context, eventName, data) {
  if (settings.global)
    return triggerAndReturn(context || document, eventName, data);
}

// Number of active Ajax requests
ajax.active = 0;

function ajaxStart(settings) {
  if (settings.global && ajax.active++ === 0)
    triggerGlobal(settings, null, 'ajaxStart');
}
function ajaxStop(settings) {
  if (settings.global && !--ajax.active)
    triggerGlobal(settings, null, 'ajaxStop');
}

// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context;
  if (
    settings.beforeSend.call(context, xhr, settings) === false ||
    triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) ===
      false
  )
    return false;

  triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
}
function ajaxSuccess(data, xhr, settings) {
  var context = settings.context,
    status = 'success';
  settings.success.call(context, data, status, xhr);
  triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
  ajaxComplete(status, xhr, settings);
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings) {
  var context = settings.context;
  settings.error.call(context, xhr, type, error);
  triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error]);
  ajaxComplete(type, xhr, settings);
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context;
  settings.complete.call(context, xhr, status);
  triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
  ajaxStop(settings);
}

// Empty function, used as default callback
function empty() {}

ajax.JSONP = function(options) {
  if (!('type' in options)) return ajax(options);

  var callbackName = 'jsonp' + ++jsonpID,
    script = document.createElement('script'),
    abort = function() {
      if (!nodejs && callbackName in window) window[callbackName] = empty;
      ajaxComplete('abort', xhr, options);
    },
    xhr = { abort: abort },
    abortTimeout,
    head = document.getElementsByTagName('head')[0] || document.documentElement;

  if (options.error)
    script.onerror = function() {
      xhr.abort();
      options.error();
    };

  if (!nodejs)
    window[callbackName] = function(data) {
      clearTimeout(abortTimeout);
      //todo: remove script
      //$(script).remove()
      delete window[callbackName];
      ajaxSuccess(data, xhr, options);
    };

  serializeData(options);
  script.src = options.url.replace(/=\?/, '=' + callbackName);

  // Use insertBefore instead of appendChild to circumvent an IE6 bug.
  // This arises when a base node is used (see jQuery bugs #2709 and #4378).
  head.insertBefore(script, head.firstChild);

  if (options.timeout > 0)
    abortTimeout = setTimeout(function() {
      xhr.abort();
      ajaxComplete('timeout', xhr, options);
    }, options.timeout);

  return xhr;
};

ajax.settings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger "global" Ajax events
  global: true,
  // Transport
  xhr: function() {
    return new XMLHttpRequest();
  },
  // MIME types mapping
  accepts: {
    script: 'text/javascript, application/javascript',
    json: jsonType,
    xml: 'application/xml, text/xml',
    html: htmlType,
    text: 'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0
};

function mimeToDataType(mime) {
  return (
    (mime &&
      (mime == htmlType
        ? 'html'
        : mime == jsonType
          ? 'json'
          : scriptTypeRE.test(mime)
            ? 'script'
            : xmlTypeRE.test(mime) && 'xml')) ||
    'text'
  );
}

function appendQuery(url, query) {
  return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
  if (typeof options.data === 'object') options.data = param(options.data);
  if (options.data && (!options.type || options.type.toUpperCase() == 'GET'))
    options.url = appendQuery(options.url, options.data);
}

ajax.get = function(url, success) {
  return ajax({ url: url, success: success });
};

ajax.post = function(url, data, success, dataType) {
  if (typeof data === 'function')
    (dataType = dataType || success), (success = data), (data = null);
  return ajax({
    type: 'POST',
    url: url,
    data: data,
    success: success,
    dataType: dataType
  });
};

ajax.getJSON = function(url, success) {
  return ajax({ url: url, success: success, dataType: 'json' });
};

export default ajax;
