import { reactive } from 'vue';

export const loginState = reactive({
  isLoggedIn: !!localStorage.getItem('user'),
  username: JSON.parse(localStorage.getItem('user'))?.email || '',
});

export function updateLoginState() {
  loginState.isLoggedIn = !!localStorage.getItem('user');
  loginState.username = JSON.parse(localStorage.getItem('user'))?.email || '';
}