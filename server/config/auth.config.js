const authConfig = {
  secret: process.env.JWT_SECRET || 'your_default_jwt_secret_if_not_in_env', //
  jwtExpiration: '24h', 
  jwtRefreshExpiration: '7d', 
};

export default authConfig;
