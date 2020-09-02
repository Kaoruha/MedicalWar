export function updateCurrentGameID(state, gameID) {
  state.current_game_id = gameID
  localStorage.setItem('current_game_id', gameID)
}
