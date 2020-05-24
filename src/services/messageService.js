import api from '@/services/api'

export default {
  fetchMessages() {
    return api.get(`messages/`)
              .then(response => response.data)
  },
  postMessage(payload) {
    return api.post(`messages/`, payload)
              .then(response => {
                console.log("added",response.data)
                return response.data
              })
  },
  deleteMessage(id) {
    return api.delete(`messages/${id}`)
              .then(response => {
                console.log("deleted",response.data)
                return response.data
              })
  },
}