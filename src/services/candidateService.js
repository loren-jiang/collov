import api from '@/services/api'

export default {
    fetchCandidates() {
        return api.get(`candidates/`)
            .then(response => response.data)
    },
    postCandidate(payload) {
        return api.post(`candidates/`, payload)
            .then(response => response.data)
    },
    deleteCandidate(id) {
        return api.delete(`candidates/${id}`)
            .then(response => response.data)
    },
}