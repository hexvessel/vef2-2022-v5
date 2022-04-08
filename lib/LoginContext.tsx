import { getURL } from 'next/dist/shared/lib/utils';
import React, { Component } from 'react'




let user = 'null';

if (typeof localStorage !== 'undefined') {
  let stuff = JSON.stringify(localStorage.getItem('user') || '')
  user = JSON.parse(stuff || 'null');
}
/*
let user = 'null'
if (typeof window.localStorage === undefined){
  user = JSON.parse('null')
}else{
  user = JSON.parse(window.localStorage.getItem('user') || 'null');
}
*/

export const Context = React.createContext({
  fetching: false,
  authenticated: !!user,
  user,
  registered: false,
  message: '',
  commented: ['0'],
  heiti: '',
  loginUser: (username:any, password:any) => { },
  logoutUser: () => { },
  postComment: (comment: any) => { },
  registerUser: (nafn: any, username: any, password: any) => { },
  deleteComment: () => { },
});

export default class User extends Component {
  state = {
    fetching: false,
    authenticated: !!user,
    message: '',
    registered: false,
    heiti: '',
    user,
    commented: ['0'],
  }

  loginUser = async (username: any, password:any): Promise<void> => {
    const data = { username: username, password: password }
    const options = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    const response = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/users/login', options)
    if (response.status === 200) {
      const data = await response.json()
      this.setState({ authenticated: true, user: data.user, heiti: JSON.stringify(data.user.name) })
      localStorage.setItem('user', JSON.stringify(data))
      
    }
    if (response.status === 401) {
      const error = await response.json()
      this.setState({ message: error.error })
    }
  };

  logoutUser = async () => {
    localStorage.removeItem('user');
    this.setState({ user: null, authenticated: false, fetching: false });
    
  };

  postComment = async (comment: any) => {
    
    const data = `{ "comment": "${comment}" }`

    const id: any = getURL()[1]

    const parsed = JSON.parse(localStorage.getItem('user') || '{ }')

    const options = {
      body: data,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${parsed.token}`,
      },
      method: 'POST',
    };

    const response = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`, options)

    if(response.status === 401){
      this.logoutUser()
      
    }
    if(response.status === 201){
      let array = this.state.commented
      array.push(id)
      this.setState({commented: array})
      
    }
  }
  registerUser = async (nafn: any, username: any, password: any): Promise<void> => {
    const data = {
      name: nafn,
      username: username,
      password: password,
    }
    const options = {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    const response = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/users/register`, options)

    if(response.status === 400){
      const error = await response.json()
      this.setState({ message: error.error })
    }
    if(response.status === 201){
      this.setState({ registered: true })
      
    }
  }

  deleteComment = async () => {

    const id: any = getURL()[1]
    const parsed = JSON.parse(localStorage.getItem('user') || '{ }')

    const options = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${parsed.token}`,
      },
      method: 'DELETE',
    };

    const response = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}/register`, options)
    console.log(response.status)
    if(response.status === 401){
      this.logoutUser()
      
    }
    if(response.status === 200){
      let array = this.state.commented
      console.log(id)
      array.splice(array.indexOf(id.toString()))
      console.log(array)
      this.setState({commented: array})
      console.log(this.state.commented)
      
    }
  }
  render() {
    const { children } = this.props;

    return (
      <Context.Provider value={{
        ...this.state,
        loginUser: this.loginUser,
        logoutUser: this.logoutUser,
        postComment: this.postComment,
        registerUser: this.registerUser,
        deleteComment: this.deleteComment,
      }}>
        {children}
      </Context.Provider>
    );
  }
}