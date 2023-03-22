import axios from 'axios';

class Service{
  constructor(){
    this.$axios = axios.create({
      baseURL: 'http://121.161.237.50:50005',
      headers:{
        Accept:"application/json",
        "Content-Type":"multipart/form-data"
        //Content-type":"multipart/form-data 두개를 나눠야하나..
      },
      widthCredentials:true
    })    
    this.$axios.interceptors.response.use((response)=>{
        return response
    }, ()=>{
        return -1
    })
  }
  get(path, param={}){
    return this.$axios.request({
      method:"GET",
      url:path,
      params:param,
      responseType:"json"
    })
  }  
  put(path,payload){
    return this.$axios.request({
      method:"PUT",
      url:path,
      responseType:"json",
      data:payload
    })
  }
  patch(path, payload){
      return this.$axios.request({
          method:"PATCH",
          url:path,
          responseType:"json",
          data:payload
      })
  }
  post(path,payload){
      return this.$axios.request({
          method:"post",
          url:path,
          responseType:"json",
          data:payload
      })
  }
  delete(path,payload){
      return this.$axios.request({
          method:'delete',
          url:path,
          responseType:'json',
          params:payload
      })
  }

}

export default Service;