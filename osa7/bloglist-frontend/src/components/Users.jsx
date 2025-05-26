import { Link } from "react-router-dom"

const Users = ({ users }) => {
   const sortedUsers = users.slice().sort((a, b) => b.blogs.length - a.blogs.length);

    return (
        <div>
            <h2>Users</h2>
            <h3>blogs created</h3>
            {sortedUsers.map((user) => (
                <div key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}</div>
            ))}
        </div>
    )
}

export default Users