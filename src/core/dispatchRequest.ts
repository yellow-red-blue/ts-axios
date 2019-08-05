import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildUrl } from '../helpers/url'
import xhr from './xhr';
import { transformRequest, transfromResponse } from '../helpers/data'
import { processHeaders } from '../helpers/header';
export default function disoatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)

  console.log(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildUrl(url!, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)
  return res
}


