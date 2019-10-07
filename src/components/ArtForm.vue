<template>
  <div class="card mb-2 float-lg-left" style="width: 18rem;">
    <div class="card-header text-left">
      <input type="text" class="form-control" placeholder="title" v-model.trim="art.title" />
    </div>
    <div class="card-body text-left">
      <textarea class="form-control" placeholder="description" v-model.trim="art.description" />
    </div>
    <div class="card-footer text-right">
      <button class="btn-sm btn-secondary" type="submit" v-on:click.prevent="addArt">add</button>
    </div>
  </div>
</template>

<script>
import CONSTANTS from "@/constants";

export default {
  name: "ArtForm",
  data() {
    return {
      art: this.emptyArt()
    };
  },
  methods: {
    addArt() {
      if (!this.art.title || !this.art.description) {
        return;
      }
      this.art.platforms = [];
      this.art.million = false;
      this.art.releasedAt = new Date();
      this.$store.dispatch("arts/addArt", this.art);
      this.art = this.emptyMemo();
    },
    emptyArt() {
      return CONSTANTS.NEW_EMPTY_ART();
    }
  },
  watch: {
    art(n, o) {
      console.log("new: %s, old: %s", JSON.stringify(n), JSON.stringify(o));
    }
  }
};
</script>
