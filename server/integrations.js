import TwitterApi from 'twitter-api-v2';
const Alert = require('./db/models/Alert');
const axios = require('axios');
const FormData = require('form-data');
const deepai = require('deepai');
const Vonage = require('@vonage/server-sdk');

//--------------------------------------------------------------
// get new alerts from Twitter and store in the database
//--------------------------------------------------------------

export const getTwitterUpdates = async () => {
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
  
  for (let i=0; i < 1 ; i++){  // just process one tweet
//  for (let i=0; i < tweets.data.data.length; i++){ // process all that were received
    const c = tweets.data.data[i];
    try{
      const newAlert = await Alert.create({
        source: 'TWITTER',
        sourceId: c.id,
        timeReceived: c.created_at,
        description: c.text
      })
      console.log(`new Twitter alert received - id: ${c.id}, created at ${c.created_at} with text of: ${c.text}`);
      const approp = await checkAppropriateness(newAlert, c.text); // if not appropriate, do not do sentiment or text sending
      if (approp.profanity.matches.length === 0 && approp.personal.matches.length === 0 && approp.link.matches.length === 0){
        await checkSentiment(newAlert, c.text);
        await sendText(newAlert, c.text);
        } else {
          newAlert.sentiment = 'Not checked';
          newAlert.textStatus = 'Not checked';
          await newAlert.save();
        }
    }
    catch(err){
      // ignore duplicate key errors - the alert has already been received
      console.log('**********', err);
    }
  }
}

//--------------------------------------------------------------
// check new alerts for appropriateness
//--------------------------------------------------------------

export const checkAppropriateness = async (Alert, textIn) => {
  const data = new FormData();
  data.append('text', textIn);
  data.append('lang', 'en');
  data.append('mode', 'standard');
  data.append('api_user', process.env.SIGHTENGINE_API_USER)
  data.append('api_secret', process.env.SIGHTENGINE_API_SECRET)
  let res;
  try{
    const resp = await axios({
      url: 'https://api.sightengine.com/1.0/text/check.json',
      method: 'post',
      data: data,
      headers: data.getHeaders(),
    })
    Alert.appropriateness = resp.data;
    await Alert.save();
    res = resp.data;
  }
  catch(err){
    console.log('SIGHTENGINE ERROR', err)
  }
  return res;
}

export const checkSentiment = async (Alert, textIn) => {
  deepai.setApiKey(process.env.DEEPAI_API_KEY);
  const resp = await deepai.callStandardApi("sentiment-analysis", {
    text: textIn,
  });
  Alert.sentiment = resp;
  await Alert.save();
}

export const sendText = async (Alert, textIn) => {
  if (!Alert.sentiment.output.includes('Negative')){
    Alert.textStatus = 'Not sent, not negative';
    await Alert.save();
  }
  const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
  })
  let vonageMsg = 'No update';
  await vonage.message.sendSms(process.env.VONAGE_FROM_PHONE, '18475140345', textIn, async (err, response) => {
    if (err){
      vonageMsg = 'Error calling vonage';
      console.log('ERROR CALLING VONAGE', err);
      Alert.textStatus = vonageMsg;
      await Alert.save();
    } else {
      if(response.messages[0]['status'] === "0") {
        vonageMsg = 'Message sent successfully';
        console.log("Message sent successfully.");
        Alert.textStatus = vonageMsg;
        await Alert.save();
      } else {
        vonageMsg = `Message failed - ${response.messages[0]['error-text']}`;
        console.log(`Message failed with error: ${response.messages[0]['error-text']}`);
        Alert.textStatus = vonageMsg;
        await Alert.save();
        }
    }
  })
}
