<template>
  <div class="art-list container-fluent">
    <div class="float-left">
      <profile />
    </div>
    <div class="float-left">
      <div class="row justify-content-start">
        <art-list-card v-for="(art, index) in arts" v-bind:key="`f-${index}`" v-bind:art="art" />
      </div>
      <div class="row">
        <button
          class="btn-sm btn-dark m-1"
          v-for="(art, index) in arts"
          v-bind:key="`s-${index}`"
          v-on:click="remove(art.id)"
        >{{ art.id }}</button>
      </div>
    </div>
    <art-list-form />
  </div>
</template>

<script>
import Profile from "@/components/Profile";
import ArtCard from "@/components/ArtCard";
import ArtForm from "@/components/ArtForm";
export default {
  name: "ArtList",
  components: {
    profile: Profile,
    "art-list-card": ArtCard,
    "art-list-form": ArtForm
  },
  data() {
    return {};
  },
  created() {
    // for debug
    console.log("created !!");
  },
  mounted() {
    this.init();
    this.start();
  },
  destroyed() {
    this.stop();
  },
  methods: {
    init() {
      this.$store.dispatch("arts/clear");
    },
    start() {
      this.$store.dispatch("arts/startListener");
    },
    stop() {
      this.$store.dispatch("arts/stopListener");
    },
    remove(id) {
      this.$store.dispatch("arts/deleteArt", { id });
    }
  },
  computed: {
    arts() {
      return this.$store.getters["arts/data"];
    }
  }
};
</script>

<style scoped>
.art-list {
  text-align: center;
}
.row {
  margin-left: 0%;
}
</style>
