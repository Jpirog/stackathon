const router = require('express').Router()
module.exports = router
const { Alert } = require('../db')
const { checkAppropriateness, checkSentiment, sendText } = require('../integrations');

router.get('/', async (req, res, next) => {
  try {
    const count = await Alert.count();
    const { trainLine, limit, offset } = req.query;
    const alerts = await Alert.findAll({
      order: [ ['timeReceived', 'DESC'] ],
      offset: offset,
      limit: limit,
    })
    res.send({ count: count, alerts: alerts }); 
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const alert = await Alert.create(req.body, {returning: true});
    const approp = await checkAppropriateness (alert, alert.description); // comment out to save API calls on trial account
    if (approp.profanity.matches.length === 0 && approp.personal.matches.length === 0 && approp.link.matches.length === 0){
      await checkSentiment(alert, alert.description);
      await sendText(alert, alert.description);
    } 
    else{
      alert.sentiment = {"id":"Not applicable","output":[]}
      alert.textStatus = 'Not sent';
      await alert.save();
    }
    res.send(alert);
  } catch (err) {
    next(err);
  }
})

// router.post('/checks', async (req, res, next) => {
  
// })
