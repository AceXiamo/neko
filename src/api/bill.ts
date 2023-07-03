import { request, host } from "@/ts/request";

export const listForMonth = (params: { month: string }) : Promise<ResponseData<BillMonthData>> => {
  return request.post(host + "/bill/listForMonth", params)
}

export const save = (params: RecordingForm) : Promise<ResponseData<BillRecord>> => {
  return request.post(host + "/bill/save", params)
}

export const update = (params: { id: string, chat: string, day: string }) : Promise<ResponseData<any>> => {
  return request.post(host + "/bill/update", params)
}

export const del = (params: { id: string }) : Promise<ResponseData<any>> => {
  return request.post(host + "/bill/del", params)
}
