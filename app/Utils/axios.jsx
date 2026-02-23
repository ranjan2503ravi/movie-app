import axios from "axios";
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
     headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mjg3MGZhNzQ2ODIwMTQxMjcyZTdiN2MxNDIzMDg0NSIsIm5iZiI6MTc2MTgwOTg5MC4wNDksInN1YiI6IjY5MDMxNWUyMmVjMWNmOGZlZTllMDUyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QC5Qji5RXVoWieBiYuoKPGroPRifrwOTWsLQSHVFQvg'
  }
});
export default instance;


