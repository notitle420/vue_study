<template>
  <div class="card m-2" style="width: 14rem">
    <h5 class="card-title">
      <p v-bind:class="pClass">{{ art.id }}</p>
    </h5>
    <router-link v-bind:to="{name: 'ArtDetails', params:{ id: art.id }}">
      <img class="img-fluid" src="@/example/image/2.jpg" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArtCard",
  data() {
    return {
      pClass: "red"
    };
  },
  mounted() {},
  props: {
    art: {
      type: Object
    }
  },
  methods: {},
  computed: {
    formatedTitle() {
      if (!this.art || !this.art.title) {
        return "";
      }
      return this.getOmissionAndPlusMidpoint(this.art.title, 16);
    },
    formatedDescription() {
      if (!this.art || !this.art.description) {
        return "";
      }
      return this.getOmissionAndPlusMidpoint(this.art.description, 60);
    }
  }
};
</script>

<style scoped>
.red {
  color: dimgrey;
  vertical-align: bottom;
  font-size: 80%;
  margin-bottom: -10px;
}
</style>
