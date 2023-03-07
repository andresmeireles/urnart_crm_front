export enum AppAction {
  login,
  logout,
  loading,
  setUser,
}

export type AppActions =
  | {
      act: AppAction.setUser;
      name: string;
    }
  | {
      data: { token: string; name: string };
      act: AppAction.login;
    }
  | {
      act: AppAction.logout;
    }
  | {
      act: AppAction.loading;
    };
