import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: AuthErrors;
  isLoggedIn: boolean;
  isModalOpen: boolean;
}

const initialState: AuthState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isLoggedIn: false,
  isModalOpen: false,
  errors: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setField(
      state: AuthState,
      action: PayloadAction<{
        field: 'username' | 'email' | 'password' | 'confirmPassword';
        value: string;
      }>
    ) {
      state[action.payload.field] = action.payload.value;
    },
    setError(
      state: AuthState,
      action: PayloadAction<{ field: keyof AuthErrors; value: string }>
    ) {
      state.errors[action.payload.field] = action.payload.value;
    },
    clearErrors(state) {
      state.errors = { ...initialState.errors };
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const {
  setField,
  setError,
  clearErrors,
  login,
  logout,
  toggleModal,
  closeModal,
} = authSlice.actions;
export default authSlice.reducer;
