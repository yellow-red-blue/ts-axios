import { isPlainObject, deepMerge } from "./until";
import { Method } from "../types";
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((item) => {
    if (item !== normalizeName && item.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[item]
      delete headers[item]
    }
  })
}
export const processHeaders = (headers: any, data: any): any => {
  console.log(headers)
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }
  console.log(headers)
  return headers
}

export const parseHeader = (headers: string): any => {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (!value) {
      return 
    }
    parsed[key] = value
  })
  return parsed
}

export function flattenHeaders(headers:any,method: Method): any {
  if(!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}