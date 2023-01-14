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
            console.log(response);  
            return response;
          });
  }
}

export default new userSvc()