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

  Submit(game_id, company_id, strategy_data) {
    return this.post('/submit', {
      "game_id": game_id,
      "company_id": company_id,
      "data": strategy_data
    })
  }

  GetCompanyData(game_id, company_id, rounds){
    return this.post('/submit', {
      "game_id": game_id,
      "company_id": company_id,
      "rounds": rounds
    })
  }

}

export default new Game()
