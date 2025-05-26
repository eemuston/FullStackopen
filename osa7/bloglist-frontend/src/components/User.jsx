import { useParams } from "react-router-dom"

const User = ({ users }) => {
    const { id } = useParams()
    const user = users.find((u) => u.id === id)

    if (!user) {
        return <div> user not found </div>
    }

    return (
        <div>
            <h1>{user.name}</h1>
            {user.blogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
            ))}
        </div>
    )
}

export default User