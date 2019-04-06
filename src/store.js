import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    storeUser(state, user) {
      Vue.set(state, 'user', user);
      if (user) {
        localStorage.setItem('user', user.username);
      } else {
        localStorage.removeItem('user');
      }
    },
  },
  actions: {
    initUser({ dispatch }) {
      const username = localStorage.getItem('user');
      if (!username) {
        return Promise.reject();
      }

      return dispatch('login', username);
    },
    login({ commit }, username) {
      const p = new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users?username=${username}`);
          if (data.length < 1) {
            reject(new Error("The user doesn't exist."));
            return;
          }

          const user = data[0];
          commit('storeUser', user);
          resolve();
        } catch (e) {
          reject(e);
        }
      });

      return p;
    },
    logout({ commit }) {
      commit('storeUser', null);
    },
  },
});
