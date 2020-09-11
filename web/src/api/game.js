import BaseModule from './base.js';

const url = 'local_api/game';

class Game extends BaseModule {
  constructor() {
    super(url, 3000);
  }

  Create(name, description) {
    return this.post('/register', {
      "name": name,
      "description": description
    })
  }

  Filter(filter, descending) {
    return this.post('/filter', {
      "start_row": 0,
      "count": 2000,
      "account_filter": filter,
      "sort_by": "id",
      "descending": descending
    })
  }

  Delete(uid) {
    return this.post('/delete', {
      "uid": uid,
    })
  }

  Submit(game_id, company_id, rounds, data) {
    return this.post('/submit', {
      "game_id": game_id,
      "company_id": company_id,
      "rounds": rounds,
      "data": data
    })
  }

  GetCompanyData(game_id, company_id, rounds) {
    return this.post('/get_com_data', {
      "game_id": game_id,
      "company_id": company_id,
      "rounds": rounds
    })
  }

  GetCompanyInfo(game_id, rounds) {
    return this.post('/get_com_info', {
      "game_id": game_id,
      "rounds": rounds
    })
  }

  GetGameInfo(game_id) {
    return this.post('/get_game_info', {
      "game_id": game_id
    })
  }

  Next(game_id, data) {
    return this.post('/next', {
      "game_id": game_id,
      "data": data
    })
  }

  Start(game_id) {
    return this.post('/start', {
      "game_id": game_id,
    })
  }

  QueryByUUID(uuid) {
    return this.post('/query_by_uuid', {
      "uuid": uuid,
    })
  }

}

export default new Game()
