export function isAuthenticated() {
  const token = localStorage.getItem('a_token');
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = payload.exp * 1000 < Date.now();
    return !isTokenExpired;
  } catch (error) {
    return false;
  }
}