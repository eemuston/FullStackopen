import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const User = ({ users }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div> user not found </div>;
  }

  return (
    <UserView>
      <h1>{user.name}</h1>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </UserView>
  );
};

const UserView = styled.div`
  font-size: 1.5rem;
`;

export default User;
