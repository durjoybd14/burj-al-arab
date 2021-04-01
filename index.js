const express = require('express');
require('dotenv').config();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://durjoybd14:naim14@cluster0.ghclx.mongodb.net/burjAlArab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const admin = require('firebase-admin');
const port = 5000;


const app = express();
app.use(cors())
app.use(express.json());

//admin


// var serviceAccount = require("./configs/burj-al-arab-lite-1-firebase-adminsdk-w2s11-ff49bb7f45.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     // databaseURL: process.env.FIRE_DB
// });




client.connect(err => {
    const bookings = client.db("burjAlArab").collection("bookings");
    app.post("/addBookings", (req, res) => {
        const newBookings = req.body;
        bookings.insertOne(newBookings)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newBookings)
    })

//not work
//     app.get('/bookings', (req, res) => {
//         const bearer = req.headers.authorization;
//         console.log(bearer);
//         if (bearer && bearer.startsWith('Bearer ')) {
//             const idToken = bearer.split(' ')[1];
//             console.log({ idToken });
//             // idToken comes from the client app
//             admin.auth().verifyIdToken(idToken)
//                 .then((decodedToken) => {
//                     const tokenEmail = decodedToken.email;
//                     if (tokenEmail === req.query.email) {
//                         bookings.find({ email: req.query.email }) //objectname:query
//                             .toArray((err, documents) => {
//                                 res.status(200).send(documents)

//                             })
//                     }
//                     else {
//                         res.status(401).send('unauthorized access')

//                     }
//                     // ...
//                 })
//                 .catch((error) => {
//                     // Handle error
//                     res.status(401).send('unauthorized access')

//                 });

//         }
//         else {
//             res.status(401).send('unauthorized access')
//         }


//     }) ///not working

// get

app.get('/bookings', (req, res)=>{
    bookings.find({email: req.query.email})
    .toArray((err , documents)=>{
        res.send(documents)
    })
})


});



app.get('/', (req, res) => {
    res.send('Hello World!')
  })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})