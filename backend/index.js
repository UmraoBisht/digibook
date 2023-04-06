const connectToMongo=require('./db');
connectToMongo();


const express = require('express')
const cors=require('cors')
const app = express()
const port = 5000

// use 
app.use(cors())
// To use request.body we need middleware to use endPoint
app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


// app.get('/', (req, res) => {
//     res.send('<h2>Hello World</h2>')
//   })
  
  app.listen(port, () => {
    console.log(`Example app listening on localhost:${port}`)
  })
