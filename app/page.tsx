import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function getData() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM users');
    return rows;
  } finally {
    client.release();
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <ul>
      {data.map((user, index) => (
        <li key={index}>
          <p>ID: {user.id}</p>
          <p>รหัสผู้ใช้งาน: {user.code}</p>
          <p>ชื่อผู้ใช้งาน: {user.name}</p>
          <p>สถานะ: {user.status}</p>
          <hr />
        </li>
      ))}
    </ul>
  );
}
