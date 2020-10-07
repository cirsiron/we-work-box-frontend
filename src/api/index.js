import Axios from './axios'

export const checkLogin = () => Axios.get('/api/common/isLogined').then(res => res.data)
