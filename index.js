const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./keys/keys');
 require('./models/user.js');
 // require('./models/Survey.js');
 require('./passport.js');



 mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
 const app = express();

 app.use(bodyParser.json());  //parse incoming post put or patch to req.bodyParser

app.use(
  cookieSession({
    maxAge: 20*20*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
// require('./routes/billingRoutes')(app);
// require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('paym/build'));      // expresss will serve from buildd

  const path = require('path');                  //express from react router index.html
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'paym','build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);
