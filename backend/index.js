const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const dbConnect = require('./config/dbConnect')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const authRoute =require('./routes/authRoute')
const categoryRoute =require('./routes/categoryRote')
const productRoute =require('./routes/productRoute')
const uploadRoute =require('./routes/uploadRoute')


dbConnect()
const PORT  =  5051
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cookieParser())


app.use('/api/user',authRoute)
app.use('/api/category',categoryRoute)
app.use('/api/products',productRoute)
app.use('/api/upload',uploadRoute)



app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})