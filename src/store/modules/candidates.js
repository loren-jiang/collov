import candidateService from '../../services/candidateService'

const STAGES = ["AP", "PS", "OS", "OF", "AC", "RE"];


const state = {
    candidates: [],
    lastFetchedCandidate: null,
}

const getters = {
    candidates: state => {
        return state.candidates
    },
    lastFetchedCandidate: state => {
        return state.lastFetchedCandidate
    },
    candidatesGrouped: state => {
        const stageMap = {};
        STAGES.forEach((s) => {
            stageMap[s] = state.candidates.filter((c) => c.stage === s);
        });
        return stageMap;
    },
    candidatesMappedByPk: state => {
        const pkMap = {};
        state.candidates.forEach(c => {
            pkMap[c.pk] = c
        })
        return pkMap
    }
}

const actions = {
    getCandidate({ commit }, id) {
        candidateService.fetchCandidate(id)
            .then(candidate => {
                commit('setLastFetchedCandidate', candidate)
            })
    },
    getCandidates({ commit }) {
        candidateService.fetchCandidates()
            .then(candidates => {
                commit('setCandidates', candidates)
            })
    },
    addCandidate({ commit }, candidate) {
        candidateService.postCandidate(candidate)
            .then((resp) => {
                const fields = ['first_name', 'last_name', 'resume', 'email', 'address', 'phone', 'stage', 'pk'];

                const filtered = Object.keys(resp)
                    .filter(key => fields.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = resp[key];
                        return obj;
                    }, {});
         
                commit('addCandidate', filtered)
            })
    },
    deleteCandidate({ commit }, id) {
        candidateService.deleteCandidate(id)
        commit('deleteCandidate', id)
    },
    updateCandidate({ commit }, candidate) {
        candidateService.updateCandidate(candidate)
            .then(candidate => {
                commit('updateCandidate', candidate);
            })
    }
}

const mutations = {
    setLastFetchedCandidate(state, candidate) {
        state.lastFetchedCandidate = candidate
    },
    setCandidates(state, candidates) {
        state.candidates = candidates
    },
    addCandidate(state, candidate) {
        state.candidates.push(candidate)
    },
    deleteCandidate(state, id) {
        state.candidates = state.candidates.filter(obj => obj.pk !== id)
    },
    updateCandidate(state, candidate) {
        let candidateIndex = null;
        state.candidates.forEach((c, idx) => {
            if (c.pk === candidate.pk) {
                candidateIndex = idx;
            }
        })

        if (candidateIndex !== null) {
            state.candidates = state.candidates.map((c, idx) => idx === candidateIndex ? candidate : c)
        }

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}