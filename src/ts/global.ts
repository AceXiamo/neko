import { host } from "@/ts/request";
import { login } from "@/api/user";
import { useUserStore } from "@/store/user"

const userStore = useUserStore()

const saveLoginRes = (res: User) => {
    userStore.saveLoginRes(res)
}

const loginVerify = () => {
    return userStore.loginVerify()
}

const getLoginUser = () => {
    return uni.getStorageSync("user")
}

const avatarHandle = (path: string) => {
    return host + '/file/view' + path
}

const loginHandle = () => {
    return new Promise(resolve => {
        uni.login({
            provider: "weixin",
            success: async (result) => {
                login({code: result.code}).then(res => {
                    saveLoginRes(res.data)
                    resolve('')
                })
            },
        });
    })
}

export { saveLoginRes, loginVerify, getLoginUser, avatarHandle, loginHandle }
