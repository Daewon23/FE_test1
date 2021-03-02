<template>
  <div class="card">
    {{ title }}
    <div class="amount">
      {{ amount }}
      <div v-if="amountInUah" class="amount-in-uah">
        {{ amountInUah }} в грн
      </div>
    </div>
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
    amount: {
      default: Number,
      required: false,
    },
    amountInUah: {
      default: Number,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  padding: 1em;
  .amount {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4em;
    font-size: 0.9em;
    font-weight: 500;
    .amount-in-uah {
      opacity: 0.5;
      font-size: 0.8em;
    }
  }
}
</style>
