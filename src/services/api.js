import axios from 'axios'
import Cookies from 'js-cookie'

export default axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': Cookies.get('csrftoken')
  }
})