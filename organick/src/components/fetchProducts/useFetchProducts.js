import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';


const useFetchProducts = () => {
  // const [productsData, setProductsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchProducts());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);
};

export default useFetchProducts;