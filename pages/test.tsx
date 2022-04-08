import type { GetServerSidePropsContext, NextPage } from 'next'
import { Key } from 'react';
import { EventsEvent } from './Components/Events/EventsEvent/EventsEvent';



const Test: NextPage = ({stuff}: any) => {
    console.log(stuff.token)
  return (<div>test</div>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const data = { username: "admin",
password: "123",}
    const options = {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      }
  
  const login = await fetch('https://vef2-20222-v3-synilausn.herokuapp.com/users/login', options)
  const stuff =  await login.json()

  return {
    props: {stuff}, // will be passed to the page component as props
  }
}


export default Test