import UserSvc from "@/service/UserSvc"

export default{
  async MEMORY_DATA({commit}, param){
    this.memoryList = [];
    console.log(param);
    const {data} = await UserSvc.fetchMemoryList(param);    
    commit('setMemoryList', data.data);
    return data;
  }
  
}