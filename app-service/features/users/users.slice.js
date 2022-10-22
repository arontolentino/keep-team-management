import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../utils';
import { setAlert } from '../alerts/alerts.slice';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    isLoading: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsers, setIsLoading } = usersSlice.actions;

export const getUsersAsync = async (params) => async (dispatch) => {
  try {
    setIsLoading(true);

    const res = await api().get(`/v1/users`, { params });

    await dispatch(await setUsers(res.data.data));
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));
  } finally {
    setIsLoading(false);
  }
};

export const inviteUserAsync = async (formData) => async (dispatch) => {
  try {
    const res = await api().post('/v1/users', formData);

    return res.data.data;
  } catch (error) {
    await dispatch(setAlert('error', error.response.data.message));

    throw error;
  }
};

export const selectUsers = (state) => state.users.users;
export const selectIsUsersLoading = (state) => state.users.isLoading;

export default usersSlice.reducer;
