import UserSvc from '@/service/UserSvc';

export default{
  async DIARY_DATA({commit}, param){
      this.diaryList = [];
      const {data} = await UserSvc.fetchDiaryList(param);
      commit('setDiaryList',data.data);
      return data;
    }
}