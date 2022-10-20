import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Alerts } from '../features/alerts';
import { getMyselfAsync, selectUser } from '../features/auth/auth.slice';
import { store } from '../redux/store';

import '../styles/globals.css';

function Wrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyselfAsync());
  }, [dispatch]);

  const user = useSelector(selectUser);

  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Alerts />
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  );
}
