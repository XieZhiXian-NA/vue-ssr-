import Vue from "vue";

import axios from "axios";

import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  let store = new Vuex.store({
    state: {
      homeInfo: "",
    },
    mutations: {
      setHomeInfo(state, res) {
        state.homeInfo = res;
      },
    },
    actions: {
      getHomeInfo({ commit }) {
        return axios.get("http:localhost:8881:/api/getHomeInfo").then((res) => {
          commit("setHomeInfo", res.data);
        });
      },
    },
  });

  return store;
}
