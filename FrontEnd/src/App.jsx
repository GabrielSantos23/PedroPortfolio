import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import Videos from './pages/Videos';
import Home from './pages/Home';
import Sidebar from './Components/Sidebar';
import MobileNavbar from './Components/MobileNavbar';

function App() {
  return (
    <div className='bg-black text-white h-screen flex flex-col  items-center'>
      <div className='max-w-6xl  w-full flex  '>
        <BrowserRouter>
          <Sidebar />
          <MobileNavbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/videos/:id' element={<Videos />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
