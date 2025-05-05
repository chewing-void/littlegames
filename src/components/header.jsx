import { Link } from 'react-router-dom';
import viteLogo from '../assets/react.svg';

export function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={viteLogo} className="header-logo" alt="Logo" />
      </div>
      <nav className="navigation">
        <div className="nav-full">
          <Link to="/">Home</Link> | <Link to="/blanko">Blanko</Link> | <Link to="/slido">Slido</Link> | <Link to="/tetro">Tetro</Link>
        </div>
        <div className="nav-mobile">
          <Link to="/">H</Link> | <Link to="/blanko">B</Link> | <Link to="/slido">S</Link> | <Link to="/tetro">T</Link>
        </div>
      </nav>
    </header>
  );
}