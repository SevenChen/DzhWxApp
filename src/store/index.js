import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    wsobj: '',
    token:'',
    volumeObj:[]
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },
    setws:(state,conObj) => {
      const obj = state
      obj.wsobj = conObj
    },
    settoken:(state,token) => {
      const obj = state
      obj.token = token
    },
    getNoVolumeStock:(state,wsObj)=>{
        wsObj.query("/market/static",
        {"market":"HK","type":"0","field":"obj"},(data)=>{
            if(data){
                data.forEach((v)=>{
                  if(state.volumeObj.indexOf(v.Obj) == -1)
                  {
                      state.volumeObj.push(v.Obj)
                  }
                })
              //console.log("states is ",state.volumeObj)
            }
        })
    }
  }
})

export default store
