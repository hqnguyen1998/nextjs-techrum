import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const connection = {}; /* creating connection object*/

async function dbConnect(req, res, next) {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return next();
  }

  /* connecting to our database */
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  connection.isConnected = db.connections[0].readyState;

  next();
}

export default dbConnect;
