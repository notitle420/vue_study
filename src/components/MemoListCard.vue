<template>
  <div class="card m-2" style="width: 14rem">
    <h5 class="card-title">
      <p v-bind:class="pClass">{{ memo.id }}</p>
    </h5>
    <router-link v-bind:to="{name: 'MemoDetails', params:{ id: memo.id }}">
      <img class="img-fluid" src="@/example/image/2.jpg" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MemoListCard",
  data() {
    return {
      pClass: "red"
    };
  },
  mounted() {},
  props: {
    memo: {
      type: Object
    }
  },
  methods: {},
  computed: {
    formatedTitle() {
      if (!this.memo || !this.memo.title) {
        return "";
      }
      return this.getOmissionAndPlusMidpoint(this.memo.title, 16);
    },
    formatedDescription() {
      if (!this.memo || !this.memo.description) {
        return "";
      }
      return this.getOmissionAndPlusMidpoint(this.memo.description, 60);
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
