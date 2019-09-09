<template>
  <div class="memo">
    <h1>{{ title }}</h1>
    <memo-table v-bind:items="memos" v-bind:fields="fields" />
  </div>
</template>

<script>
import memoTable from "@/components/MemoTable";

export default {
  name: "MemoList",
  components: {
    memoTable: memoTable
  },
  data() {
    return {
      title: "Memo List",
      fields: ["id", "title", "description", "done"],
      memos: []
    };
  },
  created: function() {
    this.memos = [
      { id: 1, title: "memo1", description: "desc1", done: true },
      { id: 2, title: "memo2", description: "desc2", done: false },
      { id: 3, title: "memo3", description: "desc3", done: false },
      { id: 4, title: "memo4", description: "desc4", done: false }
    ];
  }
};
</script>
