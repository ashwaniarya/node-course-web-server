const express = require('express');
const hbs = require('hbs')
const fs = require('fs')
var app = express();

app.set('view engine','hbs')
hbs.registerPartials(__dirname + "/views/partials")

//maintanance middleware
// app.use((req,res,next)=>{
//   res.render('maintanance.hbs')
// })

app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log.')
    }
  })
  next()
})
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase()
})

app.get('/',(req,res)=>{
  //send the data back
  //res.send('Hello Express!');

  //sending a json object
  res.render('home.hbs',{
    pageTitle:'Welcome page',
    welcomeMsg:'Welcome to my website'
  })

})

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  })
})

app.get('/bad',(req,res)=>{
  res.send({
    status:404,
    statusComment:'Not Found'
  })
})

app.listen(3000,()=>{
  console.log('server is running on port 3000')
});
