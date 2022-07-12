const express = require('express')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const morgan = require('morgan')
const cors = require('cors')
const { createRoles } = require('./libs/initialSetup')


const app = express()



app.set('port',process.env.PORT || 4000)
app.use(cors())
app.use(morgan('dev'))
require('./libs/initialSetup')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Axon APP." });
  });



app.use("/api/incident",require('./routes/incidents.routes'))
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)




module.exports = app