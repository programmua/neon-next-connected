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
          <p>Code: {user.code}</p>
          <p>Name: {user.name}</p>
          <p>Status: {user.status}</p>
          <hr />
        </li>
      ))}
    </ul>
  );
}
