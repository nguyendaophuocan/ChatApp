export const getLocalUser = (user) => {
  if (localStorage.getItem(user) !== null) return localStorage.getItem(user);
  return null;
};
export const setLocalUser = (userData) => {
  console.log(userData);
  localStorage.setItem("user", JSON.stringify(userData));
};
export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
