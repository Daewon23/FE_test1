<template>
  <b-card-group deck>
    <b-card header="Подробная информация о кошельках">
      <b-list-group flush>
        <b-list-group-item
          >Сумма в гривневом кошельке -
          <b-badge variant="primary" pill>{{ getTotalInUah }} ₴</b-badge>
        </b-list-group-item>
        <b-list-group-item v-if="checkIfUsdExist"
          >Сумма в долларовом кошельке -
          <b-badge variant="success" pill>{{ getTotalInUsd }} $ </b-badge>
        </b-list-group-item>
        <b-list-group-item v-if="checkIfEurExist">
          Сумма в евровом кошельке -
          <b-badge variant="warning" pill>{{ getTotalInEur }} € </b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card-group>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'WalletsInfo',
  computed: {
    ...mapGetters('currency', [
      'getTotalInUah',
      'getTotalInUsd',
      'getTotalInEur',
    ]),
    ...mapState('currency', ['wallets']),

    checkIfUsdExist() {
      return !!this.wallets.find((i) => i.id === 2)
    },
    checkIfEurExist() {
      return !!this.wallets.find((i) => i.id === 3)
    },
  },
}
</script>

<style lang="scss" scoped></style>
