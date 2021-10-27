<template lang="">
  <div class="container">
    <div class="card" style="width: 18rem">
      <img :src="image" class="card-img-top" :alt="pokemon.name" />
      <div class="card-body">
        <p class="card-text">
          {{ pokemon.name }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
  },
  methods: {
    getDetail() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.id}/ `)
        .then((response) => {
          this.pokemon = response.data;
        });
    },
  },
  created() {
    this.getDetail();
  },
};
</script>
<style lang=""></style>
