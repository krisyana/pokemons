<template lang="">
  <div class="container">
    <div v-if="myPokemon.length === 0">
      <h1 class="text-center my-auto">No Pokemon Catched Yet</h1>
    </div>
    <div class="row" v-else>
      <h1 class="text-center my-auto">Catched Pokemon</h1>
      <div
        v-for="(pokemon, i) in myPokemon"
        :key="pokemon.name + i"
        class="card col-sm-4 my-3 mx-auto border border-success rounded-pill"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title py-2">
            {{ pokemon.name.toUpperCase() }}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted py-1">
            {{ pokemon.capture_rate }} % rate to capture
          </h6>
          <p class="card-text">
            <button
              @click="release(pokemon.id)"
              class="btn btn-warning rounded-pill"
            >
              - Release Pokemon
            </button>
          </p>
          <router-link
            class="btn btn-primary rounded-pill"
            :to="{ name: 'Detail', params: { id: pokemon.id } }"
          >
            See Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "MyPokemon",
  computed: {
    ...mapState(["myPokemon"]),
  },
  methods: {
    ...mapMutations(["RELEASE_MY_POKEMON"]),
    release(id) {
      this.RELEASE_MY_POKEMON(id);
      this.$toast("Pokemon released!");
    },
  },
};
</script>
<style lang=""></style>
