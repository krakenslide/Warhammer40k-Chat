const { addMessage, getAllMessages } = require('../controllers/messagesController');

const router = require('express').Router();

router.post("/allmessage", getAllMessages);
router.post("/addmessage", addMessage);


module.exports = router;