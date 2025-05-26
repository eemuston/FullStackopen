import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Users = ({ users }) => {
  const sortedUsers = users
    .slice()
    .sort((a, b) => b.blogs.length - a.blogs.length);

  return (
    <UsersView>
      <h2>Users</h2>
      <h3>blogs created</h3>
      {sortedUsers.map((user) => (
        <div key={user.id}>
          <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>{' '}
          {user.blogs.length}
        </div>
      ))}
    </UsersView>
  );
};

const UsersView = styled.div`
  font-size: 1.5rem;
`;
const StyledLink = styled(Link)`
  color: #4ea8de;

  &:hover {
    color: white;
  }
`;

export default Users;
