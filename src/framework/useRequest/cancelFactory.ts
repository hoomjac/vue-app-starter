import { AxiosRequestConfig, AxiosStatic } from 'axios'

export function CancelFactory(axios: AxiosStatic) {
  const pendingReqsMap = new Map()

  function add(config: AxiosRequestConfig): void {
    const reqKey = `${config.method}-${config.url}-${JSON.stringify(
      config.params
    )}-${JSON.stringify(config.data)}`
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingReqsMap.has(reqKey)) {
          pendingReqsMap.set(reqKey, cancel)
        }
      })
  }

  function remove(config: AxiosRequestConfig): void {
    const reqKey = `${config.method}-${config.url}-${JSON.stringify(
      config.params
    )}-${JSON.stringify(config.data)}`
    if (pendingReqsMap.has(reqKey)) {
      console.log('reqKey', reqKey)
      const cancel = pendingReqsMap.get(reqKey)
      cancel(reqKey)
      pendingReqsMap.delete(reqKey)
    }
  }

  function clear() {
    for (const [reqKey, cancel] of pendingReqsMap) {
      cancel(reqKey)
    }
    pendingReqsMap.clear()
  }

  return {
    add,
    remove,
    clear
  }
}
