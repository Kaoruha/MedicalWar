export default function getToken(state) {
  if (state.token === '') {
    state.token = localStorage.getItem('Authorization')
  }
  return state.token
}
