import mockedData from '../static/mockedData.json'

export const state = () => ({
  user: mockedData.user,
  wallets: mockedData.wallets,

  totalInWallets: null,
  currencyRates: null,

  isLoading: false,
})

export const getters = {}

export const mutations = {}

export const actions = {}
