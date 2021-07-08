import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ComputedRef, Ref } from 'vue'

export interface UseRequestReturnBase<T> {
  /**
   * Any fetch errors that may have occurred
   */
  error: Ref<any>
  /**
   * The fetch response body, may either be JSON or text
   */
  data: Ref<T | null>
  /**
   * Indicates if the request is currently being fetched.
   */
  isFetching: Ref<boolean>

  /**
   * Manually call the request
   * (default not throwing error)
   */
  execute: (throwOnFailed?: boolean) => Promise<any>

  /**
   * Will automatically run fetch when [`useFetch`](/core/useFetch/)is used
   *
   * @default true
   */
  immediate?: boolean

  /**
   * The statusCode of the HTTP fetch response
   */
  statusCode: Ref<number | null>
  /**
   * The raw response of the fetch response
   */
  response: Ref<AxiosResponse | null>
}

export type UseRequestConfig = AxiosRequestConfig | { immediate?: boolean }
