export const state = () => ({
  history: [],
})

export const mutations = {
  PUSH_TO_HISTORY(state, payload) {
    state.history.unshift(payload)
  },
}

export const getters = {
  getCurrentDate: () => {
    return new Date().toLocaleDateString()
  },
  getCurrentTime() {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    // TODO Vitalya
  },
}

export const actions = {
  newWalletAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrency.value,
      reason: `Добавлен новый ${rootGetters[
        'currency/getWalletCurrencyName'
      ].toLowerCase()} кошелек`,
      amount: rootState.currency.amount,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
  addMoneyAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrencyToAdd.id,
      reason: `Пополнен ${rootState.currency.selectedCurrencyToAdd.title.toLowerCase()} кошелек`,
      amount: rootState.currency.amountToAdd,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
  withdrawMoneyAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrencyToWithDraw.id,
      reason: `Выведено с кошелька - ${rootState.currency.selectedCurrencyToWithDraw.title.toLowerCase()}`,
      amount: rootState.currency.amountToWithDraw,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
}
