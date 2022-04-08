import Link from 'next/link';
import React, { Component } from 'react';

import { Context } from '../../../lib/LoginContext';

export default class RegisterC extends Component {
    state = {
        nafn: '',
        username: '',
        password: '',
    }

    handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (registerUser: any) => async (e: any) => {
        e.preventDefault();

        const { nafn, username, password } = this.state;

        registerUser(nafn, username, password)
    }

    render() {
        const { nafn, username, password } = this.state;

        return (
            <Context.Consumer>
                {({ message, fetching, registered, registerUser }) => {
                    
                    if (registered) {
                        return (
                            <div>
                            <h1>Nýskráning</h1>
                            <p>Nýskráning tókst</p>
                            <Link href='/login'>Skráðu þig inn</Link>
                            </div>
                        );
                    }

                    return (
                        <React.Fragment>
                            <div>
                            <h1>Nýskráning</h1>
                                {message && (
                                    <p>{message}</p>
                                )}

                                <form className='form' onSubmit={this.handleSubmit(registerUser)}>

                                    <div>
                                        <label className='field label' htmlFor="nafn">Nafn:</label>
                                        <input className='field input' autoComplete="off" id="nafn" type="text" name="nafn" value={nafn} onChange={this.handleInputChange} />
                                    </div>

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