import { FaHome, FaInfoCircle, FaBuilding, FaPhone } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <>
      <div className="flex justify-center dropdown dropdown-right sm:hidden bg-transparent">
        <div tabIndex={0} role="button">
          <GiHamburgerMenu className="text-black dark:text-white" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 flex justify-center">
          <li>
            <Link className="text-gray-300 hover:text-white py-2" href="/">
              <div className="flex gap-2 rounded-full p-2">
                <FaHome className="text-xl lg:text-3xl" />
                <p>Home</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white py-2" href="#about">
              <div className="flex gap-2 rounded-full p-2">
                <FaInfoCircle className="text-xl lg:text-3xl" />
                <p>About me</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="text-gray-300 hover:text-white py-2" href="#works">
              <div className="flex gap-2 rounded-full p-2">
                <FaBuilding className="text-xl lg:text-3xl" />
                <p>Works</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-300 hover:text-white py-2"
              href="#contact">
              <div className="flex gap-2 rounded-full p-2">
                <FaPhone className="text-xl lg:text-3xl" />
                <p>Contact me</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden sm:flex justify-center items-center gap-5">
        <Link href="/">
          <div className="flex items-center">
            <div className="avatar">
              <div className="rounded-full w-8">
                <Image
                  src={'/profile.jpeg'}
                  width={20}
                  height={20}
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </Link>
        <Link className="text-gray-300 py-2" href="#about">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaInfoCircle className="text-xl lg:text-3xl" />
          </div>
        </Link>
        <Link className="text-gray-300 py-2" href="#works">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaBuilding className="text-xl lg:text-3xl" />
          </div>
        </Link>
        <Link className="text-gray-300 py-2" href="#contact">
          <div className="rounded-full hover:scale-150 transition-transform p-2">
            <FaPhone className="text-xl lg:text-3xl" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
