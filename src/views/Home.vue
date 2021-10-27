<template>
  <div class="container">
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
    >
      <div
        v-for="(pokemon, i) in pokemons"
        :key="pokemon.name + i"
        class="card my-3 mx-auto"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title">{{ pokemon.name }}</h5>
          <p class="card-text">
            <button @click="catchPoke(i + 1)" class="btn btn-info">
              Add to My Pokemon
            </button>
          </p>
          <router-link
            class="btn btn-primary"
            :to="{ name: 'Detail', params: { id: i + 1 } }"
          >
            See Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      pokemons: [],
      offset: 0,
      busy: false,
      limit: 10,
    };
  },
  methods: {
    ...mapMutations(['ADD_MY_POKEMON']),
    loadMore() {
      this.busy = true;
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=${this.offset}&limit=20 `
        )
        .then((response) => {
          const append = response.data.results;
          this.pokemons = this.pokemons.concat(append);
          this.offset += 20;
          this.busy = false;
        });
    },
    catchPoke(id) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/ `)
        .then((response) => {
          const { capture_rate } = response.data;
          if (Math.random() * 100 + 1 <= capture_rate) {
            console.log('You catch it');
            this.ADD_MY_POKEMON(response.data);
          } else {
            console.log('you fail to catch it');
          }
        });
    },
  },
  created() {
    this.offset = 0;
    this.loadMore();
  },
};
</script>
