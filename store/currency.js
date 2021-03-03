import mockedData from '../static/mockedData.json'

export const state = () => ({
  wallets: mockedData.wallets,

  selectedCurrency: null,
  amount: null,

  totalInWallets: null,
  currencyRates: null,

  isLoading: false,
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
      ? state.wallets
          .find((i) => i.type === key)
          .amount.reduce((memo, cur) => memo + cur)
      : []
  },
  getUsdRate: (state) => (key) => {
    return state.currencyRates
      ? state.currencyRates.find((i) => i.curent_curr === key).rate
      : []
  },
  getFromUsdToUah: (state, getters) => {
    return Math.round(getters.getTotalInUsd * getters.getUsdRate('USD'))
  },
  getFromEurToUah: (state, getters) => {
    return Math.round(getters.getTotalInUsd * getters.getUsdRate('EUR'))
  },
}

export const mutations = {
  UPDATE_STATE(state, payload) {
    state[payload.field] = payload.value
  },
  ADD_NEW_WALLET(state, payload) {
    state.wallets.push(payload)
  },
}

export const actions = {
  async getRates({ commit }) {
    commit('UPDATE_STATE', {
      field: 'isLoading',
      value: true,
    })
    try {
      Promise.all([
        await this.$axios.get(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20210302&json'
        ),
        await this.$axios.get(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20210302&json'
        ),
      ]).then((data) => {
        const response = { data }
        const rates = response.data.reduce((acc, cur) => {
          acc.push({
            curent_curr: cur.data[0].cc,
            rate: cur.data[0].rate,
          })
          return acc
        }, [])
        commit('UPDATE_STATE', {
          field: 'currencyRates',
          value: rates,
        })
      })
    } catch (error) {
      // TODO notify if err
      console.error(error)
    } finally {
      commit('UPDATE_STATE', {
        field: 'isLoading',
        value: false,
      })
    }
  },

  addWallet({ commit, state }, payload) {
    // eslint-disable-next-line no-empty
    if (state.wallets.find((i) => i.id === payload.id)) {
    } else {
      commit('ADD_NEW_WALLET', {
        id: payload.id,
        title: payload.title,
        type: payload.type,
        amount: payload.amount,
      })
    }
  },
}
