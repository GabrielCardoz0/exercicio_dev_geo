import api from './app';
import dotenv from 'dotenv'

dotenv.config();

api.listen(process.env.PORT, () => console.log(`Api is running on port: ${process.env.PORT}`));