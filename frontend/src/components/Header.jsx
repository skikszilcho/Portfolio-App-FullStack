import { useEffect, useRef, useState } from 'react';

const navItems = [
  ['home', 'Home'],
  ['about', 'About Me'],
  ['stack', 'Stack'],
  ['experience', 'Experience'],
  ['portfolio', 'Portfolio'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

function Header({ darkMode, onToggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sticky, setSticky] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll('section[id]'));

    const handleScroll = () => {
      setSticky(window.scrollY > 0);
      setMenuOpen(false);

      const scrollY = window.scrollY;
      sectionsRef.current.forEach((sec) => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (scrollY >= offset && scrollY < offset + height) {
          setActiveSection(sec.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <header className={`header${sticky ? ' sticky' : ''}`}>
      <a href="#home" className="logo" onClick={() => handleNavClick('home')}>
        <img src="/logo.png" alt="Logo" className="logo-img" />
      </a>

      <button
        type="button"
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        id="menu-icon"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      />

      <nav className={`navbar${menuOpen ? ' active' : ''}`}>
        {navItems.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'active' : ''}
            onClick={() => handleNavClick(id)}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'}`}
        id="darkMode-icon"
        aria-label="Toggle color theme"
        aria-pressed={darkMode}
        onClick={onToggleDarkMode}
      />
    </header>
  );
}

export default Header;
