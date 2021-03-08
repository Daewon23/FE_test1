<template>
  <div class="card">
    <div class="icon">
      <Icon prefix="fas" name="wallet" class="icon-wallet" />
    </div>
    <span>{{ title }}</span>
  </div>
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

<style lang="scss" scoped>
.card {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding: 1em;
  display: flex;
  align-items: center;
  span {
    font-weight: 500;
  }
  .icon-wallet {
    font-size: 2em;
    color: #ff7f50;
  }
}
</style>
