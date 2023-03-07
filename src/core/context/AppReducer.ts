import { AppAction, AppActions } from './AppActions';
import AppState from './AppState';

export default function appReducer(state: AppState, action: AppActions): AppState {
  const { act } = action;
  switch (act) {
    case AppAction.login:
      return state.executeLogin({ name: action.data.name, token: action.data.token });
    case AppAction.logout:
      return state.executeLogout();
    default:
      return new AppState('', '');
  }
}
