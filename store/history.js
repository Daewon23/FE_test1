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
      reason_title: `Добавлен новый ${rootGetters[
        'currency/getWalletCurrencyName'
      ].toLowerCase()} кошелек`,
      reason: 'addNewWallet',
      amount: rootState.currency.amount,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
  addMoneyAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrencyToAdd.id,
      reason_title: `Пополнен ${rootState.currency.selectedCurrencyToAdd.title.toLowerCase()} кошелек`,
      reason: 'addMoney',
      amount: rootState.currency.amountToAdd,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },
  withdrawMoneyAction({ commit, getters, rootState, rootGetters }) {
    commit('PUSH_TO_HISTORY', {
      id: rootState.currency.selectedCurrencyToWithDraw.id,
      reason_title: `Выведено с кошелька - ${rootState.currency.selectedCurrencyToWithDraw.title.toLowerCase()}`,
      reason: 'withdrawMoney',
      amount: rootState.currency.amountToWithDraw,
      date: getters.getCurrentDate,
      time: getters.getCurrentTime,
    })
  },

  editHistoryAmount({ commit, rootState }, payload) {
    this.commit('currency/CHANGE_AMOUNT_VALUE', {
      id: +payload.id,
      amount: +payload.amount,
    })
  },
}
