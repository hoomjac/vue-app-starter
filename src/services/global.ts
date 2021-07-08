import { useBaseUrl } from '@/framework/useBaseUrl'

const { baseUrl } = useBaseUrl()

export function useUserData(userId: string) {
  return useFetch(baseUrl + '/user' + userId)
}
