export function updateCurrentGameID(state, gameID) {
  state.current_game_id = gameID
  localStorage.setItem('current_game_id', gameID)
}

export function updateCurrentRounds(state, rounds) {
  state.current_rounds = rounds
  localStorage.setItem('current_rounds', rounds)
}
