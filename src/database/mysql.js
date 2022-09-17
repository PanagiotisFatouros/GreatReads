import mysql from 'mysql2/promise';

export const mysqlconn = await mysql.createConnection({ 
    host: 'great-reads.mysql.database.azure.com',
    user: 'team0',
    password: 'EvXg91q6%Xc0',
    database: 'testdb'
});