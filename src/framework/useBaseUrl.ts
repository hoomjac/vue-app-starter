import { name } from '../../package.json'

interface BaseUrl {
  baseUrl: string | null
}

export function useBaseUrl(options?: { storeKey?: string }): BaseUrl {
  const key = `${options?.storeKey ?? name}-config`
  const configStr = window.localStorage.getItem(key)

  if (configStr) {
    const config = JSON.parse(configStr)
    return {
      baseUrl: config.baseUrl || null
    }
  }

  return {
    baseUrl: null
  }
}
