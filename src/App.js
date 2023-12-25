import React from 'react';
import './styles/global.scss';
import NavMenu from './components/sections/nav-menu/nav-menu';
import Footer from './components/sections/footer/footer';
import ScrollToTop from './hooks/scrollToTop';
import useCheckAuth from './hooks/useCheckAuth';
import Routing from './router/routing';
import { routes } from './router/routes';


const App = () => {
  useCheckAuth();
  return (
    <>
      <ScrollToTop />
      <div className='App'>
        <NavMenu />
        <div className='Content'>
          <Routing routes={routes} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
