export async function showNotification ({ commit }, { type, message }) {
  commit('setNotification', { type, message })

  setTimeout(() => {
    commit('clearNotification')
  }, 3000)
}