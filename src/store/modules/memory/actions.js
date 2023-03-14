import UserSvc from "@/service/UserSvc"

export default{
  async MEMORY_DATA({commit}, param){
    this.memoryList = [];
    const {data} = await UserSvc.fetchMemoryList(param);
    console.log(data);
    commit('setMemoryList', data.data);
    return data;
  }
  
}