import {
  getUserNoFromLocalStorage,
  getUserIdFromLocalStorage,  
} from '@/utils/cookies'

export default{
  userId: getUserNoFromLocalStorage() || '',
  userNo: getUserIdFromLocalStorage() || '',
}