import React, {  useState } from 'react'
import './TripList.css'
import { useFetch } from './hooks/useFetch';

export default function TripList() {    
    const [url, setUrl] = useState('http://localhost:3000/trips')
    console.log(url)    
    const {data : trips, isPending, errors} = useFetch(url);

  return (  
    <div className='trip-list'>
      <h2>Trip List</h2>
      {isPending && <div>Trips are loading...</div>}
      {errors && <div>{errors}</div>}
      <ul>
        {trips?.map(trip => (
        <li key={trip.id}>
          <h3>{trip.title}</h3>
          <p>{trip.price}</p>
        </li>
    ))}
    </ul>
    <div className='filters'>
      <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}> European Trips</button>
      <button onClick={() => setUrl('http://localhost:3000/trips')}> All Trips</button>

    </div>
    </div>
  )
}
