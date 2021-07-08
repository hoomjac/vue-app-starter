import axios, { AxiosResponse } from 'axios'
import { reactive, toRefs } from 'vue'
import { CancelFactory } from './cancelFactory'
import { UseRequestConfig, UseRequestReturnBase } from './types'

const UseRequestDefaultConfig = { immediate: true }
const cancelHelper = CancelFactory(axios)

axios.interceptors.request.use(config => {
  cancelHelper.remove(config)
  cancelHelper.add(config)
  return config
})

axios.interceptors.response.use(
  res => {
    cancelHelper.remove(res.config)
    return res
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.resolve(error)
    } else {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        // redirect('/400')
      }
    }
  }
)

export function useRequest(
  url: string,
  config?: UseRequestConfig
): UseRequestReturnBase<any> {
  const realConfig = { ...UseRequestDefaultConfig, ...config }

  const reactiveRes = reactive({
    data: null as any,
    error: null,
    isFetching: false,
    statusCode: null as null | number,
    response: null as AxiosResponse | null
  })

  if (realConfig.immediate) {
    execute()
  }

  async function execute() {
    try {
      reactiveRes.isFetching = true
      const res = await axios({ url, ...config })
      reactiveRes.isFetching = false
      reactiveRes.data = res.data
      reactiveRes.statusCode = res.status
      reactiveRes.response = res
      return res.data
    } catch (error) {
      reactiveRes.error = error
      reactiveRes.isFetching = false
      return Promise.reject(error)
    }
  }

  return { ...toRefs(reactiveRes), execute }
}
