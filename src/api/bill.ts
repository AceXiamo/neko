import { request, host } from "@/ts/request";

export const listForMonth = (params: { month: string }): Promise<ResponseData<BillMonthData>> => {
  return request.post(host + "/bill/listForMonth", params)
}

export const todayData = (): Promise<ResponseData<BillToDayData>> => {
  return request.post(host + "/bill/todayData")
}

export const statistics = (params: { date: string }): Promise<ResponseData<BillStatisticsData>> => {
  return request.post(host + "/bill/statistics", params)
}

export const save = (params: RecordingForm): Promise<ResponseData<BillRecord>> => {
  return request.post(host + "/bill/save", params)
}

export const update = (data: BillRecord): Promise<ResponseData<any>> => {
  return request.post(host + "/bill/update", null, data)
}

export const del = (params: { id: string }): Promise<ResponseData<any>> => {
  return request.post(host + "/bill/del", params)
}
