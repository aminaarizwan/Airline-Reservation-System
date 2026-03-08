const oracledb = require('oracledb');

async function testDB() {
  try {
    const connection = await oracledb.getConnection({
      user: 'system',
      password: '123',
      connectString: 'localhost/XE' // ya 'XE' try karo
    });
    console.log('✅ Connected to Oracle DB');
    await connection.close();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
  }
}

testDB();