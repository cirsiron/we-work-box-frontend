import Axios from './axios'

export const add = (params) => {
  return Axios.post('/api/card/add', params).then(res => res.data)
}

export const remove = (params) => {
  return Axios.get('/api/card/remove', { params }).then(res => res.data)
}

export const modify = (params) => {
  return Axios.post('/api/card/modify', params).then(res => res.data)
}

export const query = (params) => {
  return Axios.get('/api/card/query', { params }).then(res => res.data)
}
