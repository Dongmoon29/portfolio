import Navbar from './navbar';
import ThemeToggleSwitch from './themeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 text-sm flex justify-between p-5">
      <Navbar />
      <ThemeToggleSwitch />
    </header>
  );
};

export default Header;
