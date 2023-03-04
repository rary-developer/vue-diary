import {
  getUserNoFromLocalStorage,
  getUserIdFromLocalStorage,  
} from '@/utils/cookies'

export default{
  userId: getUserIdFromLocalStorage() || '',
  userNo: getUserNoFromLocalStorage() || '',
}
