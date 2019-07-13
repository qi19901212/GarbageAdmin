import { invokecloudfunction,query, getAccessToken, login, logout, getInfo } from '@/api/user'
import { getToken, setTokenExpiresTime, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }) {
    var token = state.token
    return new Promise((resolve, reject) => {
      console.log("==login=accessToken===" + token)
      login(token, "login").then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  accessToken({ commit }) {
    return new Promise((resolve, reject) => {
      getAccessToken().then(response => {
        console.log("==accessToken===" + JSON.stringify(response))
        const { access_token } = response
        console.log("==data==AAA=" + access_token)
        if (access_token != undefined && access_token != null && access_token != "") {
          commit('SET_TOKEN', access_token)
          setTokenExpiresTime(access_token, 2 * 3600 - 100)//微信为二个小时，确保一定失效
        } else {
          // this.$
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  queryCommit({ commit },page) {
    return new Promise((resolve, reject) => {
      var queryStr = "db.collection(\"commit\").limit(10).skip("+page*10+").get()"
      var accessToken=state.token
      if(accessToken==null){
        accessToken=getToken()
      }
      query(accessToken, queryStr).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  queryGarbage({ commit },page) {
    return new Promise((resolve, reject) => {
      var queryStr = "db.collection(\"product\").limit(10).skip("+page*10+").get()"
      var accessToken=state.token
      if(accessToken==null){
        accessToken=getToken()
      }
      query(accessToken, queryStr).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  querySort({ commit },page) {
    return new Promise((resolve, reject) => {
      var queryStr = "db.collection(\"sort\").limit(10).skip("+page*10+").get()"
      var accessToken=state.token
      if(accessToken==null){
        accessToken=getToken()
      }
      query(accessToken, queryStr).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  invokeInsertGabarge({ commit },param) {
    return new Promise((resolve, reject) => {
      var accessToken=state.token
      if(accessToken==null){
        accessToken=getToken()
      }
      invokecloudfunction(accessToken, "addGarbage",param).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  invokeCommitToInsertGabarge({ commit },param) {
    return new Promise((resolve, reject) => {
      var accessToken=state.token
      if(accessToken==null){
        accessToken=getToken()
      }
      invokecloudfunction(accessToken, "commitToBarbarge",param).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

