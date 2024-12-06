"use client";
import styles from "./page.module.css";
import { useUsers } from "./hooks/use-users";
import { Data } from "./types";

export default function Home() {
  const { isloading, users, filteredUsers, setFilter } = useUsers();

  if (!users && isloading) {
    return <div>Loading...</div>;
  }

  if (!users && !isloading) {
    return <div>Failed to load users</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Lista de usuarios</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
        <ul>
          {filteredUsers?.map((item: Data) => (
            <li key={item.id}>
              <p>
                {item.name} - {item.username}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
