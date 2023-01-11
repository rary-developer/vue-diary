import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

//회원가입
function singUpUser(userData){  
  return instance.post('/api/user/up', userData);
}

//로그인
function loginUser(loginData){
  return instance.post('/api/user/in', loginData);
}

export {singUpUser,loginUser};

