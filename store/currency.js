import config from '../static/config'
import mockedData from '../static/mockedData.json'

export const state = () => ({
  wallets: mockedData.wallets,

  selectedCurrency: [],

  selectedCurrencyToAdd: [],
  amountToAdd: null,

  selectedCurrencyToWithDraw: [],
  amountToWithDraw: null,

  amount: null,
  currencyRates: null,

  isLoading: false,
  currencyOptions: [
    {
      value: config.EUR_ID,
      text: 'EUR',
    },
    {
      value: config.USD_ID,
      text: 'USD',
    },
  ],
})

export const getters = {
  getTotalInUah: (state, getters) => {
    return getters.getTotalByType(config.UAH_ID)
  },
  getTotalInUsd: (state, getters) => {
    return getters.getTotalByType(config.USD_ID)
  },
  getTotalInEur: (state, getters) => {
    return getters.getTotalByType(config.EUR_ID)
  },
  getTransactions: (state) => (key) => {
    return state.wallets.find((i) => i.id === key).transactions
  },
  getTotalByType: (state) => (id) => {
    const currWallet = state.wallets.find((i) => i.id === id)
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
  getWalletCurrencyName: (state) => {
    let name = null
    if (state.selectedCurrency.value === 2) {
      name = 'Евровый'
    } else if (state.selectedCurrency.value === 3) {
      name = 'Долларовый'
    } else {
      name = 'Гривневый'
    }
    return name
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
  WITHDRAW_FROM_WALLET(state, payload) {
    state.wallets.find((i) => i.id === payload.id).total -= +payload.amount
  },
  PUSH_TO_TRANSACTIONS_ARR(state, payload) {
    state.wallets.find((i) => i.id === payload.id).transactions.push(payload)
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

  addWallet({ commit, dispatch, state, getters }) {
    if (state.wallets.find((i) => i.id === state.selectedCurrency.value)) {
      this._vm.$notify({
        title: 'Упс, ошибка',
        text: 'У Вас уже есть такой кошелек!',
        type: 'warn',
      })
    } else {
      commit('ADD_NEW_WALLET', {
        id: state.selectedCurrency.value,
        title: getters.getWalletCurrencyName,
        type: state.currencyOptions.find(
          (i) => i.value === state.selectedCurrency.value
        ).text,
        total: state.amount,
        transactions: [
          {
            amount: +state.amount,
            id: state.selectedCurrency.value,
            reason: 'newWallet',
          },
        ],
      })
      this.dispatch('history/newWalletAction')
      this._vm.$notify({
        text: 'Кошелек успешно добавлен!',
        type: 'success',
      })
    }
  },

  addMoney({ commit, dispatch, state }) {
    const payload = {
      id: state.selectedCurrencyToAdd.id,
      amount: +state.amountToAdd,
      reason: 'addMoney',
      hash: 'simplestring'.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0),
    }
    if (payload.id && payload.amount) {
      commit('ADD_MONEY_TO_WALLET', payload)
      commit('PUSH_TO_TRANSACTIONS_ARR', payload)
      dispatch('getTotals')
      this._vm.$notify({
        text: 'Кошелек успешно пополнен!',
        type: 'success',
      })
      this.dispatch('history/addMoneyAction')
    } else {
      this._vm.$notify({
        text: 'Невозможно пополнить кошелек!',
        type: 'error',
      })
    }
  },

  withdrawMoney({ commit, dispatch, state }) {
    const payload = {
      id: state.selectedCurrencyToWithDraw.id,
      amount: +state.amountToWithDraw,
      reason: 'withdrawMoney',
      hash: 'simplestring'.split('').reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0),
    }
    const currentWalletTotal = state.wallets.find((i) => i.id === payload.id)
      .total

    if (payload.amount > currentWalletTotal) {
      this._vm.$notify({
        text: 'В кошельке недостаточно денег ',
        type: 'error',
      })
      return false
    }
    commit('WITHDRAW_FROM_WALLET', payload)
    commit('PUSH_TO_TRANSACTIONS_ARR', payload)
    this.dispatch('history/withdrawMoneyAction')
    this._vm.$notify({
      text: 'Успешно снято!',
      type: 'success',
    })
  },

  getTotals({ commit, state }) {
    const totals = state.wallets.reduce((memo, cur) => {
      memo.push({
        ...cur,
        total: cur.transactions.reduce((m, c) => {
          m = c.amount + m
          return m
        }, 0),
      })
      return memo
    }, [])
    commit('UPDATE_STATE', {
      field: 'wallets',
      value: totals,
    })
  },
}
