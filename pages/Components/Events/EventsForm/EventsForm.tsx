
import React, { Component } from 'react';
import { Context } from '../../../../lib/LoginContext';
import { getURL } from 'next/dist/shared/lib/utils';


export default class EventC extends Component {
    state = {
        comment: '',
    }

    handleInputChange = (e: any) => {
        const { name, value } = e.target;

        if (name) {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (postComment: any) => async (e: any) => {
        e.preventDefault();
        const { comment } = this.state;
        postComment(comment)
    }
    handleDelete = (deleteComment: any) => async (e: any)=> {
        e.preventDefault()
        deleteComment()
    }

    render() {
        const { comment } = this.state;
        return (
            <Context.Consumer>

                {({ postComment, authenticated, commented, deleteComment, }) => {
                    console.log(commented)
                    if (commented.includes(getURL()[1])) {
                        return (<div>
                            <form onSubmit={this.handleDelete(deleteComment)}>

                                <div>
                                    <label className='field label'>Þú hefur skráð þig á þennan viðburð</label>
                                </div>

                                <button className="button" >Afskrá mig</button>
                            </form>
                        </div>)
                    }
                    if (!authenticated) {
                        return (
                            <p>Skráðu þig inn til að skrá þig á viðburðinn</p>
                        )
                    }
                    if (authenticated) {
                        return (
                            <React.Fragment>
                                <div className='form'>

                                    <form onSubmit={this.handleSubmit(postComment)}>

                                        <div>
                                            <label className='field label' htmlFor="comment">Athugasemd:</label>
                                            <input className='field input' autoComplete="off" id="comment" type="text" name="comment" value={comment} onChange={this.handleInputChange} />
                                        </div>

                                        <button className="button">Skrá mig</button>
                                    </form>
                                </div>
                            </React.Fragment>
                        );
                    }
                }}
            </Context.Consumer>
        );
    }
}