import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Blanko from './pages/Blanko'
import Slido from './pages/Slido'  

function Header() {
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
  )
}

function Footer() {
  return (
    <footer className="footer">
      {/* <p>© 2024 Example Footer</p> */}
    </footer>
  )
}

function Tetro() {
  return <div className="main-content"><h1>Tetro Page</h1></div>
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blanko" element={<Blanko />} />
            <Route path="/slido" element={<Slido />} />
            <Route path="/tetro" element={<Tetro />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App