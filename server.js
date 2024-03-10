/////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const dbConnection = require('./configs/database');
var bodyParser = require("body-parser");
///////////////////////////////////////////
const userRouter = require('./routes/userRoute'); 
const brandRoutes = require('./routes/brandRoutes');
const carRoutes = require('./routes/carRoutes');
const modelRoutes = require('./routes/modelRoutes');
const saleRoutes = require('./routes/saleRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const serviceAppointmentRoutes = require('./routes/serviceAppointmentRoutes');
///////////////////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());
app.use(function middleware(req, res, next) {;//[]
    var simpleLogger = req.method + " " + req.path + " - " + req.ip;
    console.log(simpleLogger);
    next();
  });
/////////////////////////////////////////////////////////////
app.use('/api/user', userRouter);
app.use('/api/brands', brandRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/service-appointments', serviceAppointmentRoutes);
///////////////////////////////////////////////////////////////
dbConnection();
app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await auth.login(email, password);
      res.json({ user, token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});


//////