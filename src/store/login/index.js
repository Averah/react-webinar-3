import StoreModule from "../module";

class LoginState extends StoreModule {

  initState() {
    return {
      isAuthorized: false,
      user: {},
      waiting: false,
      error: ''
    }
  }

  async login(data) {
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await response.json();
      if (response.status === 200) {
        localStorage.setItem('auth-token', json.result.token);
        this.setState({
          ...this.getState(),
          isAuthorized: true,
          waiting: false,
          user: json.result.user,
          error: ''
        }, 'Авторизация прошла успешно');
      } else {
        throw new Error(json.error.data.issues[0].message)
      }

    } catch (e) {
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error: e.message,
        waiting: false
      });
    }
  }
  
  async checkAuth() {
    this.setState({
      waiting: true
    });

    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        waiting: false,
        user: {}
      });

      return;
    }

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'X-Token': authToken }
      });

      const json = await response.json();
      if (response.status === 200) {
        this.setState({
          ...this.getState(),
          isAuthorized: true,
          user: json.result,
          waiting: false,
          error: ''
        }, 'Пользователь авторизован');
      } else {
        console.log(json.error.data.issues[0].message);
        throw new Error(json.error.data.issues[0].message)
      }

    } catch (e) {
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error: e.message,
        waiting: false
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      isAuthorized: false,
      user: {},
      waiting: false,
      error: ''
    });

    const authToken = localStorage.getItem('auth-token');

    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', 'X-Token': authToken 
      }
    });
    localStorage.removeItem('auth-token')
  }

  cleanErrors() {
    this.setState({
      ...this.getState(),
      error: ''
    });
  }

}

export default LoginState;
