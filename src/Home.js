import React from 'react'
import Movies from './Movies';
import Search from './Search';

const Home = () => {

  // const name = useContext(AppContext);

  return (<>
<Search/>
    <Movies/>
    {/* <p>{name}</p> */}
  </>
  )
}

export default Home