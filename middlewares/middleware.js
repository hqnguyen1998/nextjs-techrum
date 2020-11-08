import nextConnect from 'next-connect';
import dbConnect from '../src/dbConnect';

const middleware = nextConnect();

middleware.use(dbConnect);

export default middleware;
