import { BK_URL } from '../config/setting'
import { EXPIRED_TOKEN_ERR } from '../config/error'

/**
 * Fetch API による認証付きバックエンド通信の定型処理ラッパー
 * @param string path 
 * @param {*} payload 
 */
export const authFetch = (path, payload) =>  {
    let headers = new Headers()
    //let token = localStorage.getItem("token")
    //headers.append("Authorization", `Bearer ${token}`)
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
  
    let request =  {
        method: "POST",
        mode: 'cors',
        headers: headers,
        body: JSON.stringify({ payload: payload }),
    }
    return doFetch(path, request)
}

/**
 * fetch リクエスト共通処理
 * @param string path 
 * @param {*} request 
 */
const doFetch = (path, request) => {
    return fetch(BK_URL+path, request)
        .catch((err) => { 
            console.error(err)
            //-- 通信時のエラー捕捉
            throw new Error("cors error/network error...etc")
        }).then( response => {
            //-- fetchステータスのエラー捕捉
            //if (response.status===401) throw Error(EXPIRED_TOKEN_ERR)
            // 認証エラーはここでは捕捉していない (fetch通信内容で制御できるため)
            if (!response.ok && response.status!==401) throw Error(response.statusText)
            return response
        }).then( response => {
            return response.json()
                    .catch( (err)  => {
                        console.log(err)
                        //-- JSON パース時のエラー捕捉
                        throw new Error("JSON parse error")
                    })
                })
}


