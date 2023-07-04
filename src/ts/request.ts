import qs from 'qs'
import { loginHandle } from "@/ts/global";
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const domain = "nekoai.xiamoqwq.com"
const host = "https://" + domain

const setAuth = (options: any) => {
    let user = userStore.user
    if (user) options.header = {
        Authorization: user.token,
        'Content-Type': 'application/json'
    }
}

let apiFlag: any = {}

const flagHandle = (url: string) => {
    apiFlag[url] = true
    setTimeout(() => {
        apiFlag[url] = false
    }, 500)
}

const request = {
    qs: qs,
    get: (url: string, params: any, toast: any): Promise<any> => {
        return new Promise(resolve => {
            if (apiFlag[url]) resolve({})
            let options: any = {
                url: '',
                method: "GET",
                success: (res: any) => {
                    // flagHandle(url)
                    if (res.data.code == 401) {
                        loginHandle().then(() => {
                            setAuth(options)
                            uni.request(options)
                        })
                    } else {
                        resolve(res.data)
                    }
                }
            }
            setAuth(options)
            if (params) url = url + '?' + request.qs.stringify(params)
            options.url = url
            uni.request(options)
        })
    },
    post: (url: string, params?: any, data?: any, toast?: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (apiFlag[url]) resolve({})
            let options: any = {
                url: '',
                method: "POST",
                success: (res: any) => {
                    // flagHandle(url)
                    if (res.data.code == 401) {
                        loginHandle().then(() => {
                            setAuth(options)
                            uni.request(options)
                        })
                    } else {
                        if (res.data.code === 500) {
                            toast.show({
                                text: res.data.msg
                            })
                            reject()
                        } else resolve(res.data)
                    }
                }
            }
            setAuth(options)
            if (params) url = url + '?' + request.qs.stringify(params)
            options.url = url
            if (data) options.data = data
            uni.request(options)
        })
    }
}

export { request, host }
