import Link from 'next/link';
import { Component } from 'react';
import { Context } from '../../../lib/LoginContext'




export default class Layout extends Component {

    render() {
        return (
            <Context.Consumer>
                {({ logoutUser, authenticated, user, heiti}) => {

                    if (authenticated) {
                        return (
                            <div className='link'>
                                <div>
                                    <Link href="/">Forsíða</Link>
                                </div>
                                <div>
                                    <p>skráður inn sem {heiti} </p>
                                </div>
                                <div>
                                    <button onClick={logoutUser}>Útskrá</button>
                                </div>

                            </div>
                        );
                    } else {
                        return (
                            <div className='link'>
                                <div>
                                    <Link href="/">Forsíða</Link>
                                </div>
                                <div>
                                    <Link href="/login">Innskráning</Link>
                                </div>
                                <div>
                                    <Link href="/register">Nýskráning</Link>
                                </div>
                            </div>
                        );
                    }
                }}
            </Context.Consumer>
        );
    }
}
