import mockedData from '../static/mockedData.json'

export const state = () => ({
  user: mockedData.user,
  wallets: mockedData.wallets,

  totalInWallets: null,
})

export const getters = {
  getTotalInUah: (state, getters) => {
    return getters.getTotalByType('UAH')
  },
  getTotalInUsd: (state, getters) => {
    return getters.getTotalByType('USD')
  },
  getTotalInEur: (state, getters) => {
    return getters.getTotalByType('EUR')
  },

  getTotalByType: (state) => (key) => {
    return state.wallets
      .find((i) => i.type === key)
      .amount.reduce((memo, cur) => memo + cur)
  },
}
