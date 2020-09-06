export default function getCurrentGame(state) {
  if (state.current_game_id === 0) {
    state.current_game_id = localStorage.getItem('current_game_id')
  }
  if (state.current_rounds === 0) {
    state.current_rounds = localStorage.getItem('current_rounds')
  }
  result = {
    "current_game_id":state.current_game_id,
    "current_rounds":state.current_rounds,
  }
  return result
}