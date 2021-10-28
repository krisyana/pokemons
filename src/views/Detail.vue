<template lang="">
  <div class="container">
    <div v-if="loading" class="d-flex mt-3 justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <h1 v-if="!loading" class="text-center mb-3">
      {{ name }}
    </h1>
    <div v-if="!loading" class="row">
      <div class="card col-sm-8 mx-auto mb-3" style="width: 18rem">
        <img :src="image" class="card-img-top my-2" :alt="pokemon.name" />
        <div class="card-body">
          <button @click="catchPoke(pokemon.id)" class="btn btn-info">
            Add to My Pokemon
          </button>
        </div>
      </div>
      <div class="card col-sm-8 mx-auto">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item" :style="baseColor">
              {{ pokemon.flavor_text_entries[0].flavor_text }}
            </li>
            <li class="list-group-item" :style="baseColor">
              {{ pokemon.generation.name }}
            </li>
            <li class="list-group-item" :style="baseColor">
              Capture rate : {{ pokemon.capture_rate }} %
            </li>
            <li class="list-group-item" :style="baseColor">
              Base Hapiness : {{ pokemon.base_happiness }}
            </li>
            <li class="list-group-item" :style="baseColor">
              Color : {{ pokemon.color.name }}
            </li>
            <li class="list-group-item" :style="baseColor">
              Growth Rate : {{ pokemon.growth_rate.name }}
            </li>
            <li class="list-group-item" :style="baseColor">
              Habitat : {{ pokemon.habitat.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <particles-bg
      type="circle"
      :canvas="{ backgroundColor: '#888' }"
      :bg="true"
      num="10"
    />
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { ParticlesBg } from "particles-bg-vue";

export default {
  name: "Detail",
  components: {
    ParticlesBg,
  },
  data() {
    return {
      pokemon: {
        name: "Loading...",
        color: {
          name: "black",
        },
        capture_rate: 0,
        base_happiness: 0,
        generation: {
          name: 0,
        },
        flavor_text_entries: [{ flavor_text: "new" }],
        growth_rate: {
          name: "normal",
        },
        habitat: {
          name: "plain",
        },
      },
      loading: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    image() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.$route.params.id}.svg`;
    },
    baseColor() {
      let color = `color:black`;
      if (this.pokemon) {
        color = `color:${this.pokemon?.color.name}`;
      }
      return color;
    },
    name() {
      return this.pokemon.name.toUpperCase();
    },
  },
  methods: {
    ...mapMutations(["ADD_MY_POKEMON"]),
    getDetail() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${this.id}/ `)
        .then((response) => {
          this.pokemon = response.data;
        })
        .catch((err) => {
          this.$router.push("/");
          this.$toast.error(`Error fetching pokemon : ${err}`);
        });
    },
    catchPoke(id) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${id}/ `)
        .then((response) => {
          const { capture_rate } = response.data;
          if (Math.random() * 100 + 1 <= capture_rate) {
            this.ADD_MY_POKEMON(response.data);
            this.$toast.success(`Success catch ${response.data.name}`);
          } else {
            this.$toast.error(`Failed to catch ${response.data.name}`);
          }
        })
        .catch((err) => {
          this.$toast.error(`Error fetching pokemon : ${err}`);
        });
    },
  },
  created() {
    this.loading = true;
    this.getDetail();
    this.loading = false;
  },
};
</script>
<style lang=""></style>
