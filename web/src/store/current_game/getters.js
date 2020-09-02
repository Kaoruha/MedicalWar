export default function getCurrentGameID(state) {
  if (state.current_game_id === 0) {
    state.current_game_id = localStorage.getItem('current_game_id')
  }
  return state.current_game_id
}
