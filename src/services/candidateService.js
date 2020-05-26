import api from '@/services/api'

const formalize = (payload) => {
    let formData = new FormData();
    Object.keys(payload).forEach(key => {
        if (payload[key]) {
            formData.append(key, payload[key])
        }
    })
    return formData
}

const logFormData = (formData) => {
    // Display the values for testing
    for (var value of formData.values()) {
        window.console.log(value);
    }
}


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
        const formData = formalize(payload);
        // logFormData(formData)
        return api.post(`candidates/`, formData)
            .then(response => response.data)
    },
    deleteCandidate(id) {
        return api.delete(`candidates/${id}/`)
            .then(response => response.data)
    },
    updateCandidate(payload) {
        const formData = formalize(payload);
        return api.put(`candidates/${payload.pk}/`, formData)
            .then(response => response.data)
            .catch(error => window.console.log(error))
    }
}