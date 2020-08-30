export function updateToken(state, newToken) {
  state.token = newToken
  localStorage.setItem('Authorization', newToken)
}
