import { AxiosRequestConfig } from './types/index'
import { buildUrl } from './helpers/url'
import xhr from './xhr';
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header';
function axios(config: AxiosRequestConfig) {
  // todo
  processConfig(config)
  xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)

  console.log(config)
}
function transformURL(config: AxiosRequestConfig): string {
  return buildUrl(config.url, config.params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios