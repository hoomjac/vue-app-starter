import { name } from '../../package.json'

export function injectConfig(config: any, storeKey?: string): void {
  if (process.env.NODE_ENV === 'development') {
    window.localStorage.setItem(
      `${storeKey ?? name}-config`,
      JSON.stringify(config)
    )
  } else {
    fetch('../config/config.json')
      .then((v) => v.json())
      .then((config) => {
        window.localStorage.setItem(
          `${storeKey ?? name}-config`,
          JSON.stringify(config)
        )
      })
  }
}
