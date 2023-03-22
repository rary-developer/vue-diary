import UserSvc from "@/service/UserSvc"

export default{
  async MEMORY_DATA({commit}, param){
    this.memoryList = [];        
    const {data} = await UserSvc.fetchMemoryList(param);
    commit('setMemoryList', data.data.list);
    return data;
  },
  async MEMORY_INFO({commit}, param){
    this.memoryInfo = [];
    const {data} = await UserSvc.fetchMemoryInfo(param);        
    commit('setMemoryInfo', data.data);    
  },
  async SAVE_MEMORY({commit}, param){
    console.log(param);
    const {data} = await UserSvc.saveMemory(param);
    console.log(data);
    
  }
}