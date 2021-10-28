<template lang="">
  <div class="container" style="background-image: url(@/assets/background.jpg)">
    <h1 class="text-center">{{ pokemon.name }}</h1>
    <div class="row mx-auto">
      <div class="card col-sm-6 mx-auto" style="width: 18rem">
        <img :src="image" class="card-img-top" :alt="pokemon.name" />
        <div class="card-body">
          <button @click="catchPoke(pokemon.id)" class="btn btn-info">
            Add to My Pokemon
          </button>
        </div>
      </div>
      <div class="card col-sm-6">
        <div class="card-body">
          <p>Capture rate : {{ pokemon.capture_rate }} %</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'Detail',
  data() {
    return {
      pokemon: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    image() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.$route.params.id}.svg`;
    },
    backgorund() {
      return require('@/assets/background.jpg');
    },
  },
  methods: {
    ...mapMutations(['ADD_MY_POKEMON']),
    getDetail() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.id}/ `)
        .then((response) => {
          this.pokemon = response.data;
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
    this.getDetail();
  },
};
</script>
<style lang=""></style>
