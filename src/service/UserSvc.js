import Service from "@/service/Service";

class userSvc extends Service{
  signIn(param={}){
    return this.get('/api/user/in', param)
      .then(response => {                
        return response;
      })
  }
  signUp(param={}) {
      return this.post('/api/user/up', param)
          .then(response => {                                        
            return response;
          });
  }
  fetchDiaryList(param={}){
    return this.get('/api/diary/list', param)
      .then(response => {        
        
        return response;
      })
  }
  fetchDiaryOne(param={}){
    return this.get(`/api/diary/${param.diaryNo}`)
      .then(response => {        
        return response;
      })
  }
  deleteDiary(param={}){
    return this.delete(`/api/diary/remove/${param.diaryNo}`)
      .then(response => {        
        return response;
      })
  }    
  saveDiary(param={}){
    return this.post('/api/diary/save/', param)
      .then(response => {
        return response;
      })
  }
  fetchMemoryList(param={}){
    return this.get('/api/memory/',param)
      .then(response => {
        return response;
      })
  }
  fetchMemoryInfo(param={}){
    return this.get('/api/memory/', param)
      .then(response => {
        return response;
      })
  }
  saveMemory(param={}){
    return this.post('/api/memory/save', param)
      .then(response => {
        console.log(response);
      })
  }
}

export default new userSvc()