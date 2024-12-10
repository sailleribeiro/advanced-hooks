"use client";
import styles from "./page.module.css";
import { useUsers } from "./hooks/use-users";
import { Data } from "./types";

export default function Home() {
  const {
    isloading,
    users,
    filteredUsers,
    setFilter,
    setNameNewUser,
    handleNewUser,
    handleRemoveUser,
  } = useUsers();

  if (isloading) {
    return <div>Loading...</div>;
  }

  if (!users && !isloading) {
    return <div>Failed to load users</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Cadastrar</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
          }}
        >
          <input
            type="text"
            className={styles.input}
            placeholder="Nome novo usuario"
            onChange={(e) => setNameNewUser(e.target.value)}
          />

          <button onClick={handleNewUser}>Adicionar</button>
        </div>

        <h1 className={styles.title}>Usuarios</h1>
        <input
          type="text"
          className={styles.input}
          placeholder="Procurar usuario"
          onChange={(e) => setFilter(e.target.value)}
        />

        <ul>
          {filteredUsers?.map((item: Data) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>
                {item.name} - {item.username}
              </p>
              <button onClick={() => handleRemoveUser(item.id)}>
                🗑️ Remover
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
