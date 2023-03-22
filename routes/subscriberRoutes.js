const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (e) {
    res.send(e);
  }
});

//  get one subscriber
router.get("/:id", getSubcribersById,(req, res) => {
  res.send(res.subscriber.name);
});

//creating one subcriber
router.post("/", async (req, res) => {
//   const { name, subscriberToChannel } = req.body;
  const subscriber = new Subscriber({
    name:req.body.name,
    subscriberToChannel: req.body.subscriberToChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    res.send(newSubscriber);
  } catch (e) {res.send(e.message)}
});

//updating one subscriber
router.patch("/:id",getSubcribersById, async(req, res) => {
    if(req.body.name){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel)
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel
 try{
  const updatedSubscriber = await res.subscriber.save()
  res.send(updatedSubscriber)
 }catch(e){
    res.send(e.message)
 }
});

//deleting one scubscriber

router.delete("/:id",getSubcribersById, async(req, res) => {
    console.log("")
 try{
  await Subscriber.findByIdAndDelete(req.params.id);
    res.json({message: "deleted subscriber"})
 }catch(e){
    res.send(e.message)
 }
});


async function getSubcribersById(req,res,next){
    let subscriber;
    try{
    subscriber = await Subscriber.findById(req.params.id)
    if(!subscriber){
       return res.send("no subscribers found")
    }
   
    }catch(e){
      return res.send(e.message)
    }
    res.subscriber = subscriber
    next()
}

module.exports = router;
