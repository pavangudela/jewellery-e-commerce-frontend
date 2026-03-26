import axios from "axios"
// const token="eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQ1VTVE9NRVIiLCJzdWIiOiJrYWx5YW5AOTA5MCIsImlhdCI6MTc2MTI4MDk5OSwiZXhwIjoxNzYxNjQwOTk5fQ.noZaXg3Vd4gGqVOmxrgCK3T1g-DyOPHEbFQJmIlOOuDbDq8lntMllYqswaC_sD1tsmzzqMsTV1yWAJS6z0g0ig"
const api=axios.create({
    baseURL:"http://localhost:8080/api",
    // headers:{
    //     Authorization: `Bearer ${token}`
    // }
});

api.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("token");
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
    return config;
    },
    (err)=>Promise.reject(err)   
);

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
      if(error.response&&error.response.status===401){
        console.warn("token is expired or unathorized")
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        window.location.href="/login";
      }
      return Promise.reject(error)
    }
    )


  export default api;