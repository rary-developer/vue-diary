import {
  deleteLocalStorage
} from '@/utils/cookies'

export default{
  setUserData(state, data){            
    state.userId = data.data.userData.userId;
    state.userNo = data.data.userData.userNo;
  },
  clearUserData(state){      
    state.userNo = '';
    state.userId = '';
    deleteLocalStorage('userNo','userId');
  },
}