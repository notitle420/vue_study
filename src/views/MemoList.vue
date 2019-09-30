<template>
  <div class="art-list container-fluent">
    <div class="float-left">
      <profile />
    </div>
    <div class="float-left">
      <div class="row justify-content-start">
        <art-list-card v-for="(memo, index) in memos" v-bind:key="`f-${index}`" v-bind:memo="memo" />
      </div>
      <div class="row">
        <button
          class="btn-sm btn-dark m-1"
          v-for="(memo, index) in memos"
          v-bind:key="`s-${index}`"
          v-on:click="remove(memo.id)"
        >{{ memo.id }}</button>
      </div>
    </div>
    <memo-list-form />
  </div>
</template>

<script>
import Profile from "@/components/Profile";
import MemoListCard from "@/components/MemoListCard";
import MemoListForm from "@/components/MemoListForm";
export default {
  name: "MemoList",
  components: {
    profile: Profile,
    "art-list-card": MemoListCard,
    "memo-list-form": MemoListForm
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
      this.$store.dispatch("memos/clear");
      //this.$store.dispatch("user/clear");
    },
    start() {
      this.$store.dispatch("memos/startListener");
      //this.$store.dispatch("user/startListener");
    },
    stop() {
      this.$store.dispatch("memos/stopListener");
    },
    remove(id) {
      this.$store.dispatch("memos/deleteMemo", { id });
    }
  },
  computed: {
    memos() {
      return this.$store.getters["memos/data"];
    }
  }
};
</script>

<style scoped>
.memo-list {
  text-align: center;
}
.row {
  margin-left: 0%;
}
</style>
