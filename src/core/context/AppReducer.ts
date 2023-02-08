import { AppAction, AppActions } from "./AppActions";
import { AppState } from "./AppContext";

export default function appReducer(state: AppState, action: AppActions): AppState {
    const { act } = action;
    switch (act) {
      case AppAction.Loading:
        return state.copyWith({ isLoading: true });
      case AppAction.Login:
        return state.copyWith({ isLoading: false, name: action.data.name, token: action.data.token });
      case AppAction.Login:
        return state.copyWith({ isLoading: false, name: '' });
      default:
        return new AppState(false, "", "");
    }
  };