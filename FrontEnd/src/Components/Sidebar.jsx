import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { getInfo } from '../api/sanity';

const Sidebar = () => {
  const [getInfoA, setGetInfoA] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const postsData = await getInfo();
      setGetInfoA(postsData);
    }
    fetchData();
  }, []);

  console.log(getInfoA[0]);

  const links = [
    { label: ' home', path: '/' },
    { label: ' info', path: '/about' },
    { label: ' contact', path: '/contact' },
  ];
  const routes = useLocation();
  return (
    <div className='2xl:flex justify-center fixed h-full z-[999]  flex-col hidden'>
      <Link to={'/'}>
        <p className='font-RussoOne text-xl transition duration-500 ease-in-out pb-7 hover:text-[#FFC93A]'>
          p.cacemiro
        </p>
      </Link>
      <div className='flex flex-col gap-2'>
        {links.map((link) => (
          <Link key={link.path} to={link.path} className=''>
            <p
              className='font-RussoOne text-[13px] '
              style={{
                color: routes.pathname === link.path ? '#FFC93A' : '#fff',
              }}
            >
              {link.label}
            </p>
          </Link>
        ))}
      </div>
      <div className='flex mt-7 gap-1 '>
        <Link target='blank' to={`${getInfoA[0]?.youtube}`}>
          <AiFillYoutube
            className='hover:text-[#FFC93A] transition duration-500 ease-in-out cursor-pointer'
            style={{
              fontSize: '22px',
            }}
          />
        </Link>
        <Link
          target='blank'
          to={`http://intagram.com/${getInfoA[0]?.instagram}`}
        >
          <AiFillInstagram
            className='hover:text-[#FFC93A] transition duration-500 ease-in-out cursor-pointer'
            style={{
              fontSize: '22px',
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
