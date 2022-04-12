import Vue from 'vue'
import Vuex from 'vuex'
import { Magic } from 'magic-sdk';
import Web3 from 'web3';

Vue.use(Vuex)

Vue.config.productionTip = false;
const m = new Magic('pk_live_A09592868CF881BC', { network: 'rinkeby'})
const web3 = new Web3(m.rpcProvider)

export default new Vuex.Store({
	state: {
		user: null,
        provider: web3,
        token: ''
	},
	mutations: {
		SET_USER_DATA(state, userData) {
			state.user = userData
			localStorage.setItem('user', JSON.stringify(userData))
		},
		CLEAR_USER_DATA() {
			localStorage.removeItem('user')
			location.reload()
		},
		SET_TOKEN(state, tokenData) {
			state.token = tokenData
			localStorage.setItem('token',tokenData)
		},
		ADD_WALLET(state, wallet) {
			console.log(wallet)
			const jObj = state.user
			if (jObj.publicAddress.includes(wallet)) {
				const idx = jObj.publicAddress.indexOf(wallet)
				jObj.publicAddress.splice(idx, 1)
				jObj.publicAddress = [wallet].concat(jObj.publicAddress)
			} else {
				const arr = new Array(1)
				arr[0] = wallet
				jObj.publicAddress = arr.concat(jObj.publicAddress)
			}
			state.user = jObj
			localStorage.setItem('user', JSON.stringify(state.user))
		}
	},
	actions: {
		async login({ commit }, email) {
			await m.auth.loginWithMagicLink(email)
			const data = await m.user.getMetadata()
			data.publicAddress = [data.publicAddress]
			commit('SET_USER_DATA', data)
		},
		async logout({ commit }) {
			await m.user.logout()
			commit('CLEAR_USER_DATA')
		},
		
	},
	modules: {},
})
