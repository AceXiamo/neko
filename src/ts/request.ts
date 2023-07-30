import qs from 'qs'
import { loginHandle } from "@/ts/global";
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const mode = import.meta.env.MODE
let domain: string;
let host: string;
if (mode === 'development') {
    domain = "localhost:8080"
    host = "http://" + domain
} else {
    domain = "nekoai.xiamoqwq.com"
    host = "https://" + domain
}

domain = "nekoai.xiamoqwq.com"
host = "https://" + domain

const setAuth = (options: any) => {
    let user = userStore.user
    if (user) options.header = {
        Authorization: user.token,
        'Content-Type': 'application/json'
    }
}

const request = {
    qs: qs,
    get: (url: string, params: any, toast: any): Promise<any> => {
        return new Promise(resolve => {
            let options: any = {
                url: '',
                method: "GET",
                success: (res: any) => {
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
            let options: any = {
                url: '',
                method: "POST",
                timeout: 30000,
                success: (res: any) => {
                    if (res.data.code == 401) {
                        loginHandle().then(() => {
                            setAuth(options)
                            uni.request(options)
                        })
                    } else {
                        if (res.data.code === 500) reject(res.msg)
                        else resolve(res.data)
                    }
                },
                fail: (err: any) => {
                    reject(err)
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
