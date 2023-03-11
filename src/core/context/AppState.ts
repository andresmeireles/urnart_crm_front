export default class AppState {
  constructor(public readonly name: string, public readonly token: string) {}

  copyWith(props: { name?: string; token?: string }): AppState {
    const { name, token } = props;
    return new AppState(name ?? this.name, token ?? this.token);
  }

  get isLogged(): boolean {
    return this.name.trim().length !== 0 && this.token.trim().length !== 0;
  }

  executeLogin(props: { name: string; token: string }) {
    const { name, token } = props;
    // set token on storage
    localStorage.setItem('token', token.substring(token.indexOf('|') + 1, token.length));
    return this.copyWith({
      name,
      token,
    });
  }

  executeLogout() {
    // set token on storage
    localStorage.removeItem('token');
    return this.copyWith({
      name: '',
      token: '',
    });
  }
}
