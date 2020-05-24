import messageService from '../../services/messageService'

const state = {
  messages: [],
}

const getters = {
  messages: state => {
    return state.messages
  }
}

const actions = {
  getMessages({ commit }) {
    messageService.fetchMessages()
      .then(messages => {
        commit('setMessages', messages)
      })
  },
  addMessage({ commit }, message) {
    messageService.postMessage(message)
      .then((resp) => {

        const fields = ['subject', 'body', 'pk'];

        const filtered = Object.keys(resp)
          .filter(key => fields.includes(key))
          .reduce((obj, key) => {
            obj[key] = resp[key];
            return obj;
          }, {});
        console.log("resp", filtered);
        console.log("message", message)
        commit('addMessage', filtered)
        // commit('addMessage', message)
      })
  },
  deleteMessage({ commit }, msgId) {
    messageService.deleteMessage(msgId)
    commit('deleteMessage', msgId)
  }
}

const mutations = {
  setMessages(state, messages) {
    state.messages = messages
  },
  addMessage(state, message) {
    state.messages.push(message)
  },
  deleteMessage(state, msgId) {
    state.messages = state.messages.filter(obj => obj.pk !== msgId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}