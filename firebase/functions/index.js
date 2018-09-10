const functions = require('firebase-functions');
const admin = require('firebase-admin');
require('dotenv').config();
const TokenUtil = require('./TokenUtil');

const settings = { timestampsInSnapshots: true };

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
db.settings(settings);

const cors = require('cors')({
  origin: true
});

const SECRET = process.env.SECRET;

exports.setSettings = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let decoded_token;
    // Get JWT token from header
    const token = req.get("x-extension-jwt");

    // Get payload from request body
    const { position } = req.body;
    try
    {
      // Only decode token, no need to verify if its from broadcaster
      decoded_token = TokenUtil.verifyToken(token, SECRET);
    } catch (err)
    {
      console.error("JWT was invalid", err);
      res.status(401).json({});
      return;
    }

    console.info('Channel ID:', decoded_token.channel_id, 'set:', req.body);

    try {
      await writeData(decoded_token.channel_id, position);
      res.status(200).end();
    } catch (error) {
      console.error('Channel ID:', decoded_token.channel_id, data);
      res.status(400).json(error);
    }

  });
});

exports.getSettings = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    let decoded_token;
    // Get JWT token from header
    const token = req.get("x-extension-jwt");

    try
    {
      // Only decode token, no need to verify if its from broadcaster
      decoded_token = TokenUtil.decodeToken(token, SECRET);
    } catch (err)
    {
      console.error("JWT was invalid", err);
      res.status(401).json({});
      return;
    }

    try {
      let data = await readData(decoded_token.channel_id);
      res.json(data);
    } catch (error) {
      console.error('Channel ID:', decoded_token.channel_id, 'error getting info', error);
      res.status(400).end();
    }

  });

});

const writeData = async(channel_id, position) => {
   let docReg = await db.collection("users").doc(channel_id).set({
    position: position
  });
}

const readData = async (channel_id) => {
  let querySnapshot = await db.collection("users").doc(channel_id).get();

  return querySnapshot.data();
}