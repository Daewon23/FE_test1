import mockedData from '../static/mockedData.json'

export const state = () => ({
  wallets: mockedData.wallets,

  selectedCurrency: [],
  amount: 0,

  totalInWallets: null,
  currencyRates: null,

  isLoading: false,

  currencyOptions: [
    {
      value: 2,
      text: 'EUR',
    },
    {
      value: 3,
      text: 'USD',
    },
  ],
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
    const currWallet = state.wallets.find((i) => i.type === key)
    if (currWallet) {
      return currWallet.total
    }
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
  ADD_MONEY_TO_WALLET(state, payload) {
    state.wallets.find((i) => i.id === payload.id).total += +payload.amount
  },
  ADD_TO_ARR(state, payload) {
    state.wallets.find((i) => i.id === payload.id).amount.push(payload.amount)
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

  addWallet({ commit, state }) {
    // eslint-disable-next-line no-empty
    if (state.wallets.find((i) => i.id === state.selectedCurrency.value)) {
      this._vm.$notify({
        title: 'Упс, ошибка',
        text: 'У Вас уже есть такой кошелек!',
        type: 'warn',
      })
    } else {
      commit('ADD_NEW_WALLET', {
        id: state.selectedCurrency.value,
        title: state.selectedCurrency.value === 2 ? 'Евровый' : 'Долларовый',
        type: state.currencyOptions.find(
          (i) => i.value === state.selectedCurrency.value
        ).text,
        amount: [+state.amount],
        total: state.amount,
      })
      this._vm.$notify({
        text: 'Кошелек успешно добавлен!',
        type: 'success',
      })
    }
  },

  addMoney({ commit }, payload) {
    commit('ADD_MONEY_TO_WALLET', payload)
    commit('ADD_TO_ARR', payload)
  },

  getTotals({ commit, state }) {
    const totals = state.wallets.reduce((memo, cur) => {
      memo.push({
        ...cur,
        total: cur.amount.reduce((m, c) => m + c),
      })
      return memo
    }, [])
    commit('UPDATE_STATE', {
      field: 'wallets',
      value: totals,
    })
  },
}
