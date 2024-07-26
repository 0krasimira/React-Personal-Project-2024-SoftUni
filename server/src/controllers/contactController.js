const contactManager = require('../managers/contactManager')
const router = require('express').Router()

router.get('/contacts', async (req, res) => {
    try {
      const queries = await contactManager.getAllQueries();
      res.status(200).json(queries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

router.post('/contacts', async (req, res) => {
    const { fullName, email, message } = req.body;
    try {
        const responseMessage = await contactManager.submitQuery(fullName, email, message);
        res.status(200).json({ message: responseMessage });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})
  
module.exports = router

// to do if there is time: write a controller and function to delete a contact query once it is answered 