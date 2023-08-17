require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(
    process.env.Skey
)

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (request, response) => response.send('hello world'));


app.post('/payments/create', async(request, response)=>{
    try{
        const total = request.query.total;
    console.log('Payment Request Recieved for this amount >>> ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    })

    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
    }catch(error){
        console.log(error.message)
        response.status(500).send('server error')
    }
})

app.listen(8990,"0.0.0.0", ()=>{
    console.log("Server is running on port 8990")
})

// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const stripe = require('stripe')(process.env.Skey)

// const app = express()
// app.use(cors())
// app.use(express.json())

// // Root endpoint
// app.get('/', (request, response) => {
//   response.send('hello world')
// })

// // Payment creation endpoint
// app.post('/payments/create', async (request, response) => {
//   try {
//     const { total } = request.body; // Use request.body.total for the amount
//     console.log('Payment Request Received for this amount >>> ', total);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: 'usd',
//     })

//     response.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     })
//   } catch (error) {
//     console.log(error.message)
//     response.status(500).send('Server error')
//   }
// })

// const PORT = 8990;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// })