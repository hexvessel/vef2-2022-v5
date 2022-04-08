
import { NextPage, GetServerSidePropsContext } from 'next'
import Link from 'next/link';
import { Key } from 'react';
import { Context } from '../lib/LoginContext';
import  EventsForm  from './Components/Events/EventsForm/EventsForm';

const Event: NextPage = ({ data }: any) => {
    const reg = data.registrations
    return (<section className="event">
      <div className="event__info">
        <h1 className="event__title">{data.name}</h1>
        <p className="event__description">{data.description}</p>
        </div>
        <div className="event__registered">
                <h2 className="event__subtitle">Skráningar á viðburð</h2>
                {reg.length === 0 &&
                    <p className="event__empty">Engin hefur skráð sig á þennan viðburð</p>
                }
                <ul className="event__registeredList">
                    {reg.length > 0 && reg.map((regis: { name: any; comment: any; }, i: Key | null | undefined) => {
                        const {
                            name, comment
                        } = regis;
                        return (<li className="event__registeredItem" key={i}>
                            <span className="event__registeredName">{name}</span>
                            {comment != null &&
                                <span className="event__registeredComment">{comment}</span>}
                        </li>)
                    })}
                </ul>
            </div>
            <EventsForm />
            
            <Link  href="/" >Til baka</Link>
            
        </section>
    )
}
  
  export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context.params?.id ?? '-'
    const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/${id}`)
    const data = await res.json()
    if (!data.name) {
        return {
          notFound: true,
        }
      }
    return {
      props: {data, id}, 
    }
  }

export default Event