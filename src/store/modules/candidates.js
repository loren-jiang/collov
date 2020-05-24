import candidateService from '../../services/candidateService'

const state = {
    candidates: [],
}

const getters = {
    candidates: state => {
        return state.candidates
    }
}

const actions = {
    getCandidates({ commit }) {
        candidateService.fetchCandidates()
            .then(candidates => {
                commit('setCandidates', candidates)
            })
    },
    addCandidate({ commit }, candidate) {
        candidateService.postCandidate(candidate)
            .then((resp) => {
                const fields = ['first_name', 'last_name', 'resume', 'address', 'phone', 'stage', 'pk'];

                const filtered = Object.keys(resp)
                    .filter(key => fields.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = resp[key];
                        return obj;
                    }, {});
                console.log(filtered)
                commit('addCandidate', filtered)

                //     commit('addCandidate', candidate)
            })
    },
    deleteCandidate({ commit }, id) {
        candidateService.deleteCandidate(id)
        commit('deleteCandidate', id)
    }
}

const mutations = {
    setCandidates(state, candidates) {
        state.candidates = candidates
    },
    addCandidate(state, candidate) {
        state.candidates.push(candidate)
    },
    deleteCandidate(state, id) {
        state.candidates = state.candidates.filter(obj => obj.pk !== id)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}