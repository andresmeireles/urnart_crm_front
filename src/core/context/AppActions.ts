export enum AppAction {
    Login,
    Logout,
    Loading,
  }

export type AppActions = {
    data: {token: string, name: string},
    act: AppAction.Login,
} | {
    act: AppAction.Logout,
} | {
    act: AppAction.Loading
}