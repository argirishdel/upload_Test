const express = require('express');

const apiRoutes = require('./server/api/api.route');

const webRoutes = require('./server/web/web.route');

const multer = require('multer');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/api', apiRoutes);

router.use('/web', webRoutes);

const multerConfig = {
    
  storage: multer.diskStorage({
   //Setup where the user's file will go
   destination: function(req, file, next){
     next(null, './public/photo-storage');
     },   
      
      //Then give the file a unique name
      filename: function(req, file, next){
          console.log(file);
          const ext = file.mimetype.split('/')[1];
          next(null, file.fieldname + '-' + 'bmw.'+ext);
        }
      }),   
      
     
    };


router.post('/upload',multer(multerConfig).single('pic'),function(req,res){
  res.send('Complete!');
});

module.exports = router;
