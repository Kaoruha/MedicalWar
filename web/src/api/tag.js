import BaseModule from './base.js'

const url = 'local_api/tag'

class Tag extends BaseModule {
  constructor() {
    super(url, 3000);
  }

  Register(name, description) {
    return this.post('/register', {
      "name": name,
      "description": description,
      "icon_url": ''
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

  Delete(id) {
    return this.post('/delete', {
      "id": id,
    })
  }

  Upload(data) {
    const formData = new FormData();
    formData.append("file", data)
    return this.upload('/upload', formData)
  }
}

export default new Tag()
