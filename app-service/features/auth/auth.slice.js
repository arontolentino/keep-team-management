import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils';
import { setAlert } from '../alerts/alerts.slice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
    loading: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setLoading, setIsAuthenticated } = authSlice.actions;

export const getMyselfAsync = () => async (dispatch) => {
  try {
    const res = await api().get('/v1/auth/myself');

    dispatch(setIsAuthenticated(true));
    dispatch(setUser(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export const loginAsync = async (formData) => async (dispatch) => {
  try {
    const res = await api().post('/v1/auth/login', formData);

    await dispatch(setIsAuthenticated(true));
    await dispatch(setLoading(false));
    await dispatch(setUser(res.data.data));
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));

    throw error;
  }
};

export const registerAsync = (formData) => async (dispatch) => {
  try {
    const res = await api().post('/v1/auth/register', formData);

    await dispatch(setIsAuthenticated(true));
    await dispatch(setUser(res.data.data));
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));

    throw error;
  }
};

export const activateAsync = (formData, inviteId) => async (dispatch) => {
  try {
    const res = await api().post(`/v1/auth/activate/${inviteId}`, formData);

    await dispatch(setIsAuthenticated(true));
    await dispatch(setUser(res.data.data));
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));

    throw error;
  }
};

export const getInviteAsync = async (inviteId) => async (dispatch) => {
  try {
    const res = await api().get(`/v1/invites/${inviteId}`);

    return res.data.data;
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));

    throw error;
  }
};

export const logoutAsync = () => async (dispatch) => {
  try {
    await api().get('/v1/auth/logout');

    await dispatch(setIsAuthenticated(false));
    await dispatch(setUser({}));
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));
  }
};

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.loading;

export default authSlice.reducer;
