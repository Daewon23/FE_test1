export const state = () => ({
  history: [],
})

export const mutations = {
  PUSH_TO_HISTORY(state, payload) {
    state.history.push(payload)
  },
}

export const getters = {
  getCurrentDate: () => {
    return new Date().toLocaleDateString()
  },
  getCurrentTime() {
    return new Date().toLocaleTimeString()
  },
}

export const actions = {
  newWalletAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrency.value,
      reason: `Добавлен новый ${rootGetters['currency/getWalletCurrencyName']} кошелек`,
      amount: rootState.currency.amount,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
  addMoneyAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrencyToAdd.id,
      reason: `Пополнен ${rootGetters['currency/getWalletCurrencyName']} кошелек`,
      amount: rootState.currency.amountToAdd,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
}
