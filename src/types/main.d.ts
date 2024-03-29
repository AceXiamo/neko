type Month = {
  year: number,
  month: number,
  disabled: boolean
}

type ShowMode = "view" | "edit";

type LoginReqData = {
  code: string
}

type RecordingForm = {
  chat: string
  day: string
  images: string[]
  hasAiSay?: boolean
}

type ResponseData<T> = {
  code: number
  msg: string
  data: T
}

type User = {
  openId?: string
  nickname?: string
  avatar?: string
  isBan?: string
  createTime?: string
  updateTime?: string
  banEndTime?: string
  descOfBan?: string
  token?: string
  sessionKey?: string
}

type BillRecordType = 0 | 1

type BillRecord = {
  id?: string
  icon?: string
  remark?: string
  price?: number
  recordType?: BillRecordType
  aiSay?: string
  recordTime?: string
  createTime?: string
  updateTime?: string
  wxUserId?: string
  images?: string
  imageList?: string[]
}

type BillDayData = {
  day: string
  out: number
  in: number
  details: BillRecord[]
}

type BillMonthData = {
  out?: number
  in?: number
  days?: BillDayData[]
}

type BillToDayData = {
  out: number
  in: number
  withLastDay: number
}

type BillStatisticsData = {
  out?: number
  in?: number
  inDetail?: BillTypeData[]
  outDetail?: BillTypeData[]
}

type BillTypeData = {
  typeId: number
  typeName: string
  price: number 
}

type UploadStatus = 'wait' | 'run' | 'finish'

type ImageItem = {
  url: string
  status: UploadStatus
}
