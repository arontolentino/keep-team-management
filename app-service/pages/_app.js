import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store';

import '../styles/globals.css';

function Wrapper({ children }) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMyselfAsync());
  // }, [dispatch]);

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
