import { useQuery } from '@apollo/client';
import { createContext, useContext, useReducer, Dispatch, ReactElement, useEffect } from 'react';
import { getUser } from '../../features/auth/graphql/query/user';
import { AppAction, AppActions } from './AppActions';
import appReducer from './AppReducer';
import AppState from './AppState';

const initState = new AppState('', '');

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initState,
  dispatch: () => '',
});

export default function AppProvider(props: { children: JSX.Element }): ReactElement {
  const [state, dispatch] = useReducer(appReducer, initState);
  const { loading, error, data } = useQuery(getUser());

  useEffect(() => {
    if (!loading) {
      if (error !== undefined) {
        dispatch({ act: AppAction.logout });
      }
      if (data !== undefined) {
        dispatch({
          act: AppAction.login,
          data: {
            token: localStorage.getItem('token')!,
            name: data.getUser.name,
          },
        });
      }
    }
  }, [loading]);

  if (loading) {
    return <p>aguarde...</p>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <>{props.children}</>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
