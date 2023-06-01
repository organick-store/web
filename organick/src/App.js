import './styles/global.scss';
import NavMenu from './components/sections/nav-menu/nav-menu';
import Footer from './components/sections/footer/footer';
import MainBody from './pages/main/main';
import CartBody from './pages/cart/cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuccessBanner from './components/UI/banners/success-banner/success-banner';
import NotFound from './pages/not-found/not-found';
import ScrollToTop from './pages/scrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='App'>
        <NavMenu />
        <div className='Content'>
          <Routes>
            <Route exact path='/' element={<MainBody />} />
            <Route exact path='/cart' element={<CartBody />} />
            <Route exact path='/success' element={<SuccessBanner />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
