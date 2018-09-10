const jwt =  require('jsonwebtoken');
const EXTENSTION_USER_ID = "120750024";

function decodeToken(token, secret) {
  const secret_decoded = new Buffer(secret, 'base64');
  return jwt.verify(token, secret_decoded);
}

function verifyToken(token, secret) {
  const decoded = decodeToken(token, secret);
  
  if(decoded.role !== 'broadcaster') throw Error('Must be broadcaster role.')

  return decoded;
}

function signToken(secret) {
  const secret_decoded = new Buffer(secret, 'base64');
  const tokenObj = {
    "user_id": EXTENSTION_USER_ID,
    "role": "external"    
  };

  return jwt.sign(tokenObj, secret_decoded, {
    expiresIn: '1h'
  });
}

function signChannelMessageToken(channel_id, secret) {
  const secret_decoded = new Buffer(secret, 'base64');
  const tokenObj = {
    "user_id": EXTENSTION_USER_ID,
    "role": "external",
    "channel_id": channel_id,
    "pubsub_perms": {
      "send": [
        "broadcast"
      ]
    }
  };

  return jwt.sign(tokenObj, secret_decoded, {
    expiresIn: '1h'
  });
}

module.exports= {
  decodeToken: decodeToken,
  verifyToken: verifyToken,
  signToken: signToken,
  signChannelMessageToken: signChannelMessageToken
};