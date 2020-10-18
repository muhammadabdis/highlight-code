export function setNotification (state, { type, message }) {
  state.show = true
  state.type = type
  state.message = message
}

export function clearNotification (state) {
  state.show = false
  state.type = ''
  state.message = ''
}