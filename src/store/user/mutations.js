export function setUser (state, { id, name }) {
  state.id = id
  state.name = name
}

export function removeUser (state) {
  state.id = null
  state.name = null
}