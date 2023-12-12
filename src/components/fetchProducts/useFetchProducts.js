import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';


const useFetchProducts = () => {
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