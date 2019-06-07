/*
 * @Author: wusiyuan.sonny
 * @Date: 2019-05-06 21:30:43
 * @Last Modified by: wusiyuan.sonny
 * @Last Modified time: 2019-05-07 11:04:19
 */
import { forEach, isObject, isDate } from '../utils'
/**
 *
 * @param url url
 * delete 哈希标记    /test#hash, {foo: bar}         => `/test?foo=bar`
 */
const deleteHash = (url: string): string => {
  const index = url.indexOf('#')
  return index !== -1 ? url.substr(0, index) : url
}

/**
 *
 * @param url url
 * 特殊字符支持:      /tset, {foo: '@:$, '}          => `/test?foo=@:$+`
 * 注意，我们会把空格转换成+
 */
const encode = (url: string): string => {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 *
 * @param url /test
 * @param params {a:1, b:2}
 * case:
 * TODO: 参数值为非引用类型: /test, {a:1, b:2}              => `/test?a=1&b=2`
 * TODO: 参数值为数组:      /test, {foo: ['bar', 'baz']}   => `/test?foo[]=bar&foo[]=baz`
 * TODO: 参数值为对象:      /test, {foo: {bar: 'baz}}      => `/test?foo=%7B%22bar%22:%22baz%22%7D`
 * TODO: 参数值为Date:     /test, {date: newDate()}       => `/test?date=2019-04-01T05:55:39.030Z`
 * TODO: 参数值为空值忽略:  /test, {foo: 'bar', baz: null} => `/test?foo=bar`
 *       特殊字符支持:      /tset, {foo: '@:$, '}          => `/test?foo=@:$+`
 *       delete哈希标记    /test#hash, {foo: bar}         => `/test?foo=bar`
 * TODO: 保留已存在的参数   /test?foo=bar, {bar: 'baz' }    => `/test?foo=bar&bar=baz`
 */
export const bulidURL = (url: string, params?: any): string => {
  if (!params) {
    // delete 哈希标记
    return url
  }
  let serializedParams
  let parts: string[] = []
  forEach(params, (val, key = '') => {
    if (val == null) {
      return
    }
    if (Array.isArray(val)) {
      key = key + '[]'
    } else {
      val = [val]
    }
    forEach(val, v => {
      if (isObject(v)) {
        v = JSON.stringify(v)
      } else if (isDate(v)) {
        v = v.toISOString()
      }
      parts.push(encode(key) + '=' + encode(v))
    })
  })
  serializedParams = parts.join('&')
  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
