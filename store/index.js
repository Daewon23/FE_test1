import mockedData from '../static/mockedData.json'

export const state = () => ({
  user: mockedData.user,
  wallets: mockedData.wallets,

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
      .find((i) => i.type === key)
      .amount.reduce((memo, cur) => memo + cur)
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
  UPDATE_TOTALS(state, payload) {},
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

  getTotals({ commit, state, getters }) {
    const Uah = state.wallets.find((i) => i.id === 1)

    const Usd = state.wallets.find((i) => i.id === 2)

    if (Uah) {
      console.log(getters.getTotalInUah, 'UA')
    } else if (Usd) {
      console.log('sdhkj')
    }
  },
}
