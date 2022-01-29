const GOOGLE_CLIENT_ID =
  '370216097261-4tg11h727n6nlb5hann30vsrrf23v1pd.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'https://clonetwitter.shop/api/v1/google/callback';

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=
${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}
&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
