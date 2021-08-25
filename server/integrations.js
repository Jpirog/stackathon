//const { db, User } = require('./db')
import TwitterApi from 'twitter-api-v2';
const Alert = require('./db/models/Alert');
const axios = require('axios');
const FormData = require('form-data');
const deepai = require('deepai')

//--------------------------------------------------------------
// get new alerts from Twitter and store in the database
//--------------------------------------------------------------

const getTwitterUpdates = async () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });
  const roClient = twitterClient.readOnly;

  let user;
  
  user =  await (await roClient.v2.userByUsername('metraUPNW'));
  const tweets = await twitterClient.v2.userTimeline(user.data.id, { 'max_results': 5,  'tweet.fields': 'author_id,id,text,created_at', expansions:'author_id', 'user.fields':'name' })
  
  for (let i=0; i < 1; i++){  // just process one tweet
//  for (let i=0; i < tweets.data.data.length; i++){
    const c = tweets.data.data[i];
    try{
      const newAlert = await Alert.create({
        source: 'TWITTER',
        sourceId: c.id,
        timeReceived: c.created_at,
        description: c.text
      })
      console.log(`new Twitter alert received - id: ${c.id}, created at ${c.created_at} with text of: ${c.text}`);
      await checkAppropriateness(newAlert, c.text);
      await checkSentiment(newAlert, c.text);
    }
    catch(err){
      // ignore duplicate key errors - the alert has already been received
      //console.log('**********', err);
    }
  }
}

//--------------------------------------------------------------
// check new alerts for appropriateness
//--------------------------------------------------------------

const checkAppropriateness = async (Alert, textIn) => {
  console.log('CALLING SITEENGINE on', textIn);
  const data = new FormData();
  data.append('text', textIn);
  data.append('lang', 'en');
  data.append('mode', 'standard');
  data.append('api_user', process.env.SIGHTENGINE_API_USER)
  data.append('api_secret', process.env.SIGHTENGINE_API_SECRET)
  try{
    const resp = await axios({
      url: 'https://api.sightengine.com/1.0/text/check.json',
      method: 'post',
      data: data,
      headers: data.getHeaders(),
    })
    console.log('SIGHTENGINE', resp.data)
    Alert.appropriateness = resp.data;
    await Alert.save();
  }
  catch(err){
    console.log('SIGHTENGINE ERROR', err)
  }
}

const checkSentiment = async (Alert, textIn) => {
  deepai.setApiKey(process.env.DEEPAI_API_KEY);
  const resp = await deepai.callStandardApi("sentiment-analysis", {
    text: textIn,
  });
  console.log('*** sentiment', resp);
  Alert.sentiment = resp;
  await Alert.save();
}


// set Twitter retrieval integration to run every 10 minutes
setInterval(() => getTwitterUpdates(), 5000) // 1000*60*10)
