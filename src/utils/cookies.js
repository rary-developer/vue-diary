function saveUserNoToLocalStorage(userData) {
  localStorage.setItem("userNo",`${userData.userNo}`);
}

function saveUserIdToStorage(userData){
  localStorage.setItem("userId",`${userData.userId}`);
}

function getUserNoFromLocalStorage() {
  return localStorage.getItem("userNo");
}

function getUserIdFromLocalStorage() {
  return localStorage.getItem("userId");
}

function deleteLocalStorage(str , str2) {
  localStorage.removeItem(str);
  localStorage.removeItem(str2);
}

export {
  saveUserNoToLocalStorage,
  saveUserIdToStorage,
  getUserNoFromLocalStorage,
  getUserIdFromLocalStorage,
  deleteLocalStorage,
};
