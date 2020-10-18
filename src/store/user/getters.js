export function getUser ({ id, name }) {
  return { id, name }
}

export function isAuthenticated ({ id }) {
  return !!id
}