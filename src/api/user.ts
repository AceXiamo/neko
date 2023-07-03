import { request, host } from '@/ts/request'

export const login = (params: LoginReqData) : Promise<ResponseData<User>> => {
  return request.post(host + "/wx/login", params)
}
