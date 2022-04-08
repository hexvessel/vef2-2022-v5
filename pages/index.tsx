import type { GetServerSidePropsContext, NextPage } from 'next'
import { Key } from 'react';
import  EventsEvent  from './Components/Events/EventsEvent/EventsEvent';



const Home: NextPage = ({data}: any) => {
  const {items} = data
  return (<section className="events">
  <h2 className="events__title">Viðburðir á næstunni</h2>
  <ul className="events__list">
      {items.length === 0 && (
          <li>Engir viðburðir</li>
      )}
      {items.length > 0 && items.map((event: { id: any; name: any; description: any; }, i: Key | null | undefined) => {
          const {
              id, name, description
          } = event;
          return (
              <EventsEvent
                key={i}
                url={id}
                name={name}
                description={description}
              />
            )
          })}
  </ul>
</section>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`https://vef2-20222-v3-synilausn.herokuapp.com/events/`)
  const data = await res.json()
  if(!data){
      return {notFound: true,}
  }
  return {
    props: {data}, // will be passed to the page component as props
  }
}


export default Home
