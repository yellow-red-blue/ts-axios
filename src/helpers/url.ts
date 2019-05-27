import { isDate, isPlainObject } from './until'
export const encode = (val: string): string => {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/g, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}
export const buildUrl = (url: string, params?: any): string => {
  if (!params) {
    return url
  }
  const part: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
      console.log(values, key)
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      part.push(`${encode(key)}=${encode(val)}`)
    });


    console.log(part)
  });
  let serializedParams = part.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex > -1) {
      url = url.split('#')[0]
    }
    url += ((url.indexOf('?') === -1) ? `?${serializedParams}` : `&${serializedParams}`)
  }
  return url
}