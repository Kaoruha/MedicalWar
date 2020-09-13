import BaseModule from './base.js';

const url = 'api/hospital';

class Hospital extends BaseModule {
  constructor() {
    super(url, 3000);
  }

  Create(name, description,scale,type_) {
    return this.post('/register', {
      "name": name,
      "description": description,
      "scale": scale,
      "type_":type_
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
}

export default new Hospital()
