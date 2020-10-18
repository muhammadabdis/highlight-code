import { post } from "../../utils"

// eslint-disable-next-line no-unused-vars
export async function register ({ commit }, { name }) {
  const user = await post('/user/register', {}, { name} )

  return user
}

export async function login ({ commit }, { name }) {
  const user = await post('/user/login', {}, { name })

  commit('setUser', { id: user.data.id, name: user.data.name })

  localStorage.setItem('userId', user.data.id)
  localStorage.setItem('userName', user.data.name)

  return user
}

export async function logout ({ commit }) {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')

  commit('removeUser')

  return { message: 'Logged out' }
}