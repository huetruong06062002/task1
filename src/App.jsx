import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ProductsPage from './pages/ProductPage';
import Menu from './components/Menu';
import ProductManagement from './pages/ProductManagement';

const App = () => {
  return (
    <>
      <Menu />
      <div className="">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/manage-product" element={<ProductManagement/>} />
        </Routes>
      </div>

    </>


  );
};

export default App;
