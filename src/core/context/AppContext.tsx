import { ReactNode, createContext, useContext, useReducer, Dispatch, ReactElement } from 'react';
import { AppActions } from './AppActions';
import appReducer from './AppReducer';

export class AppState {
  constructor(
    public readonly isLoading: boolean,
    public readonly name: string,
    public readonly token: string,
  ) {}

  copyWith(props: { isLoading?: boolean; name?: string; token?: string }): AppState {
    const { isLoading, name, token } = props;
    return new AppState(isLoading ?? this.isLoading, name ?? this.name, token ?? this.token);
  }

  get isLogged(): boolean {
    return this.name.trim().length !== 0 && this.token.trim().length !== 0;
  }
}

const initState = new AppState(false, '', '');

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initState,
  dispatch: () => '',
});

export default function AppProvider(props: { children: JSX.Element }): ReactElement {
  const [state, dispatch] = useReducer(appReducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <>{props.children}</>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
