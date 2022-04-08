import React, { Component } from 'react';

import { Context } from '../../../lib/LoginContext';

export default class LoginC extends Component {
  state = {
    username: '',
    password: '',
  }

  handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (loginUser: any) => async (e: any) => {
    e.preventDefault();

    const { username, password } = this.state;

    loginUser(username, password);
  }

  render() {
    const { username, password } = this.state;

    return (
      <Context.Consumer>
        {({ message, loginUser, fetching }) => {

          if (fetching) {
            return (
              <p>Skrái inn <em>{username}</em>...</p>
            );
          }

          return (
            <React.Fragment>
              <div>
                {message && (
                  <p>{message}</p>
                )}

                <form className='form' onSubmit={this.handleSubmit(loginUser)}>

                  <div>
                    <label className='field label' htmlFor="username">Notendanafn:</label>
                    <input className='field input' autoComplete="off" id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
                  </div>

                  <div>
                    <label className='field label' htmlFor="password">Lykilorð:</label>
                    <input className='field input' autoComplete="off" id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
                  </div>

                  <button className='button' disabled={fetching}>Innskrá</button>
                </form>
              </div>
            </React.Fragment>
          );
        }}
      </Context.Consumer>
    );
  }
}