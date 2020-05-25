import api from '@/services/api'

export default {
    fetchCandidate(id) {
        return api.get(`candidates/${id}/`)
            .then(response => response.data)
    },
    fetchCandidates() {
        return api.get(`candidates/`)
            .then(response => response.data)
    },
    postCandidate(payload) {
        return api.post(`candidates/`, payload)
            .then(response => response.data)
    },
    deleteCandidate(id) {
        return api.delete(`candidates/${id}/`)
            .then(response => response.data)
    },
    updateCandidate(payload) {
        return api.put(`candidates/${payload.pk}/`, payload)
            .then(response => response.data)
    }
}