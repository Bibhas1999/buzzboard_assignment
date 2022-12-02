import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const db_name = process.env.DB_NAME
const db_port = process.env.DB_PORT
const db_host = process.env.DB_HOST

const db_url = `mongodb://${db_host}/${db_name}`
mongoose.connect(db_url, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
  if (!err) {
    console.log('MongoDB connected successfully');
  } else {
    console.error('ERR_DB_CONNECT : ' + err);
  }
});
export default db_url