import { Pool } from 'pg';

const connectionString = 'postgres://bpdirqkn:6Db76VCbRBk5_HMAK1QE3UV53FklVokS@kesavan.db.elephantsql.com/bpdirqkn';
const db = new Pool({ connectionString });

export default db;