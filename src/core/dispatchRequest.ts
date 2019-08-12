import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildUrl } from '../helpers/url'
import xhr from './xhr';
import { flattenHeaders } from '../helpers/header'
import { transform } from './transform'
export default function disoatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
  console.log(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.config.headers, res.config.transfromResponse)
  return res
}


