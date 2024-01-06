import Navbar from './navbar';
import ThemeToggleSwitch from './themeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 text-sm flex justify-between px-5 bg-transparent">
      <Navbar />
      <ThemeToggleSwitch />
    </header>
  );
};

export default Header;
