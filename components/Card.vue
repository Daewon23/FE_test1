<template>
  <div class="card">{{ title }}</div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      default: String,
      required: false,
    },
  },
}
</script>

<style scoped>
.card {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding: 1em;
}
</style>
