const { saveToken, removeToken } = require('@/utils/tokens');
const { createSlice } = require('@reduxjs/toolkit')


const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart(state) {
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess(state, { payload }) {
			state.isLoading = false;
			state.user = payload.user;
			state.token = payload.token;
			saveToken(payload.token);
		},
		loginFailure(state, { payload }) {
			state.isLoading = false;
			state.error = payload;
		},
		logout(state) {
      state.token = null;
      state.user = null;
      removeToken()
    }
	},
});

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice
