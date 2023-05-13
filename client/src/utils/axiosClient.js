import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";

// old code start
// let baseURL;
// console.log(`the server url is ${process.env.REACT_APP_SERVER_BASE_URL}`)

// export const axiosClient = axios.create({
//   baseURL : process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:4000",
//   // baseURL : 'https://recipe-website-project.vercel.app' || "http://localhost:4000",
// withCredentials: true, //used to send cookies
// });
// ...............................................
// old code end

//code to choose between development or production

//new code start
// let baseURL = "http://localhost:4000/"; 
let baseURL = process.env.REACT_APP_SERVER_BASE_URL;
console.log("env is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  console.log("baseurl is", process.env.REACT_APP_SERVER_BASE_URL);
  baseURL = process.env.REACT_APP_SERVER_BASE_URL;
}

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true, //used to send cookies
});
//new code end

//adds access token in initial request and sends the request to backend
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

//gets the response from backend..first checks if the status is ok..if yes..send data back to the user
//response.config holds the actual url that we called from client to backend.
axiosClient.interceptors.response.use(async (response) => {
  const data = response.data; //when you fetch using axios..apart from the result in data(we get in data field)..we get more extra info from backend.
  //if the response is success i.e access token is valid
  if (data.status === "ok") {
    console.log("the access token is valid");
    console.log(data);
    return data;
  }

  //if invalid access code, we will collect all the info we got in response
  const statusCode = data.statusCode;
  const originalRequest = response.config;
  const error = data.message;

  //if access token expired,call refresh api to generate new access token

  //below code updated
  // if(statusCode === 401 && !originalRequest._retry){
  //     originalRequest._retry = true;

  //     const response = await axios.create({
  //       baseURL,
  //       withCredentials: true,
  //     }).get(`/auth/refresh`)

  //     // if(response.data.status === 'ok'){
  //     //     setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken)
  //     //     originalRequest.headers["Authorization"] = `Bearer ${response.data.result.accessToken}`;
  //     //     return axios(originalRequest);
  //     // }

  //     if (response.data.status === "ok") {
  //         setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
  //         originalRequest.headers[
  //           "Authorization"
  //         ] = `Bearer ${response.data.result.accessToken}`;

  //         console.log(
  //           "token from backend after generating new access token ",
  //           response.data.result.accessToken
  //         );
  //         const refreshedResponse = await axios(originalRequest);
  //             return refreshedResponse.data;

  //     }
  //     else {
  //         removeItem(KEY_ACCESS_TOKEN);
  //         window.location.replace('/login',"_self");
  //         return Promise.reject(error);

  //     }
  // }

  if (statusCode === 401 && !originalRequest._retry) {
    // means the access token has expired

    originalRequest._retry = true;

    const response = await axios

      .create({
        baseURL,

        withCredentials: true,
      })

      .get(`/auth/refresh`);

    if (response.data.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);

      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      console.log(
        "token from backend after generating new access token ",
        response.data.result.accessToken
      );

      const refreshedResponse = await axios(originalRequest);

      return refreshedResponse.data;
    } else {
      window.location.replace("/login", "_self");

      removeItem(KEY_ACCESS_TOKEN);

      return Promise.reject(error);
    }
  }

  return Promise.reject(error);

  // }, async(error)=>{
  //       console.log('there was an error!')
  //     return Promise.reject(error);
  //   });
});
