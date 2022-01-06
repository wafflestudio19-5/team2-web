const CLIENT_ID = "2a67f6f860f8158c7115a3b3bfc90be0";
const REDIRECT_URI =  "http://clonetwitter.shop/oauth/callback/kakao";
const REDIRECT_URI_FRONT = "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;