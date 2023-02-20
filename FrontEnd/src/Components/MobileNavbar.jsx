import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react';
const links = [
  { label: 'home', path: '/' },
  { label: 'info', path: '/about' },
  { label: 'contact', path: '/contact' },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <div className='2xl:hidden flex absolute '>
      <div className='z-[9999] w-screen flex fixed justify-end bg-transparent '>
        <Hamburger toggled={isOpen} toggle={setIsOpen} direction='right' />
      </div>

      <motion.nav
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 z-50 ${
          isOpen ? '' : 'pointer-events-none'
        }`}
        variants={menuVariants}
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
      >
        <ul className='flex flex-col justify-center h-full text-center'>
          {links.map((link) => (
            <li key={link.path} className='py-8'>
              <Link
                to={link.path}
                className='text-white text-2xl font-bold font-RussoOne tracking-widest'
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </div>
  );
};

export default MobileMenu;
