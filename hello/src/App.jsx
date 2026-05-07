import { useState, useEffect } from "react";

function ChildProfile({ name, age }) {
  return (
    <div className="card child-card">
      <div className="card-inner-label">Component — Child Profile</div>
      <div className="profile-name">{name}</div>
      <div className="tag-row">
        <span className="tag tag-purple">Age: {age}</span>
        <span className="tag tag-green">Active User</span>
      </div>
    </div>
  );
}

function UserTable({ users, loading }) {
  if (loading) {
    return (
      <div className="loading-text">
        Fetching users
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
        <span className="loading-dot">.</span>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-inner-label">API Response — jsonplaceholder/users</div>
      <div className="table-header">
        <span className="table-header-cell">Username</span>
        <span className="table-header-cell">Email</span>
      </div>
      {users.map((user) => (
        <div key={user.id} className="user-row">
          <span className="user-name">@{user.username}</span>
          <span className="user-email">{user.email}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const name = "Amrik Singh";
  const age = 19;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <div className="section">
        <p className="section-label">React Props Demo</p>
        <h2 className="section-heading">
          Parent passes <span className="highlight-purple">name</span> &{" "}
          <span className="highlight-purple">age</span> to child
        </h2>
        <ChildProfile name={name} age={age} />
      </div>

      <div className="section">
        <h2 className="section-heading">
          Users from <span className="highlight-green">API</span>
        </h2>
        <UserTable users={users} loading={loading} />
      </div>
    </div>
  );
}
