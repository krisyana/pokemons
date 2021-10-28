import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myPokemon: [],
  },
  mutations: {
    ADD_MY_POKEMON(state, payload) {
      state.myPokemon = state.myPokemon.concat(payload);
    },
    RELEASE_MY_POKEMON(state, payload) {
      state.myPokemon = state.myPokemon.filter((item) => item.id !== payload);
    },
  },
  actions: {},
  modules: {},
});
