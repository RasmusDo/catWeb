import './navbar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="title">
        Cat 😇
      </Link>
      <ul>
        <CustomLink to="/random">Random</CustomLink>
        <CustomLink to="/signin">signin</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
