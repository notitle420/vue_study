<template>
  <div class="memo-table">
    <b-table striped hover :items="items" :fields="fields" />
  </div>
</template>

<script>
export default {
  name: "memoTable",
  props: ["items", "fields"]
};
</script>
