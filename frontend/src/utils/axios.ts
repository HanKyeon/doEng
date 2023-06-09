import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import store, { DispatchToast } from "store/index"
import { tokenActions } from "store/tokenSlice"

/*
서버에 요청을 날리는 axios instance
*/

const interceptorRequest = axios.create({
  baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
  // baseURL: "http://70.12.246.176:8200", // 로컬(혜은) 주소
  // baseURL: "http://70.12.247.228:8080", // 로컬(제혁) 주소
  withCredentials: true,
  timeout: 10000, // 10초까지만 대기
})

const apiRequest = axios.create({
  baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
  // baseURL: "http://70.12.246.176:8200", // 로컬(혜은) 주소
  // baseURL: "http://70.12.247.228:8080", // 로컬(제혁) 주소
  withCredentials: true,
  timeout: 10000, // 10초까지만 대기
})

// request 인터셉터
apiRequest.interceptors.request.use(
  (config) => {
    const state = store.getState() // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken // 리덕스 accessToken 읽기

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // 리덕스에 accessToken이 있을 경우 Authorization 헤더 추가
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
apiRequest.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.log(error)
    const response = error.response // 에러 정보
    if (
      response.status === 401 &&
      response.data.message === "만료된 JWT 토큰입니다."
    ) {
      console.log("재요청")
      const originalConfig = error.config // 기존 요청 정보 저장 (accessToken 재발급 후 재요청)

      // access Token 재발급
      const state = store.getState() // 리덕스 상태 가져오기
      const accessToken = state.token.accessToken // 리덕스 accessToken 읽기
      const refreshToken = state.token.refreshToken // 리덕스 refreshToken 읽기

      interceptorRequest.defaults.headers.common[`accesstoken`] = accessToken
      interceptorRequest.defaults.headers.common[`refreshtoken`] = refreshToken

      const config: AxiosRequestConfig = {
        method: "post",
        url: `/api/auth/reissue`,
      }

      return interceptorRequest(config)
        .then((res) => {
          console.log("토큰 재발급 성공", res)
          const newAccessToken = res.headers["accesstoken"]
          store.dispatch(
            tokenActions.setAccessToken({ accessToken: newAccessToken }),
          )

          // 기존 요청 새로운 token으로 재시도
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
          return apiRequest(originalConfig)
        })
        .catch((err) => {
          console.log("토큰 재발급 에러 : ", err)
          store.dispatch(tokenActions.deleteTokens({}))
          store.dispatch(DispatchToast("다시 로그인해주세요.", false))
          window.location.href = "https://j8a601.p.ssafy.io/member/login"
          return Promise.reject(err)
        })
    } else if (response.status === 403) {
      store.dispatch(DispatchToast("권한이 없습니다.", false))
    } else if (response.status >= 500) {
      store.dispatch(
        DispatchToast(
          "서버와의 통신할 수 없습니다.\n 잠시 후 다시 시도해 주세요",
          false,
        ),
      )
    }
    return Promise.reject(error)
  },
)

export default apiRequest

/*
AI서버에 요청을 날리는 axios instance
*/

const gameRequest = axios.create({
  baseURL: "https://j8a601.p.ssafy.io", // 서버 주소
  // baseURL: "http://70.12.246.176:8200", // 로컬(혜은) 주소
  // baseURL: "http://70.12.247.228:8080", // 로컬(제혁) 주소
  withCredentials: true,
  timeout: 10000, // 10초까지만 대기
})

// request 인터셉터
gameRequest.interceptors.request.use(
  (config) => {
    const state = store.getState() // 리덕스 상태 가져오기
    const accessToken = state.token.accessToken // 리덕스 accessToken 읽기

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // 리덕스에 accessToken이 있을 경우 Authorization 헤더 추가
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response 인터셉터
gameRequest.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  (error) => {
    console.log(error)
    const response = error.response // 에러 정보
    if (response.status === 401) {
      console.log("재요청")
      const originalConfig = error.config // 기존 요청 정보 저장 (accessToken 재발급 후 재요청)

      // access Token 재발급
      const state = store.getState() // 리덕스 상태 가져오기
      const accessToken = state.token.accessToken // 리덕스 accessToken 읽기
      const refreshToken = state.token.refreshToken // 리덕스 refreshToken 읽기

      interceptorRequest.defaults.headers.common[`accesstoken`] = accessToken
      interceptorRequest.defaults.headers.common[`refreshtoken`] = refreshToken

      const config: AxiosRequestConfig = {
        method: "post",
        url: `/api/auth/reissue`,
      }

      return interceptorRequest(config)
        .then((res) => {
          console.log("토큰 재발급 성공", res)
          const newAccessToken = res.headers["accesstoken"]
          store.dispatch(
            tokenActions.setAccessToken({ accessToken: newAccessToken }),
          )

          // 기존 요청 새로운 token으로 재시도
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
          return gameRequest(originalConfig)
        })
        .catch((err) => {
          console.log("토큰 재발급 에러 : ", err)
          store.dispatch(tokenActions.deleteTokens({}))
          store.dispatch(DispatchToast("다시 로그인해주세요.", false))
          // window.location.href = window.location.hostname + "/member/login"
          return Promise.reject(err)
        })
    }
    return Promise.reject(error)
  },
)

export { gameRequest }
