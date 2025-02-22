import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>React Router</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/about">About</Link>
        <span> | </span>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
