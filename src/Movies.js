
import React from 'react'
import { useGlobalContext } from './Context';


const Movies = () => {

  const { movie } = useGlobalContext();
  // console.log(movie)
  
  return (
    <>
    <div>hello</div>
      {
        movie.map((curMovie) => {
          return (
            <div >
       
              <h2> {curMovie.Title}</h2>
            </div>
            
          )
        })
      }
    </>
  )
}

export default Movies

// import React from 'react'
// import { useGlobalContext } from './Context';

// const Movies = () => {
//   const { movie } = useGlobalContext();

//   return (
//     <>
//       <div>hello</div>
//       {
//         Array.isArray(movie) && movie.map((curMovie) => {
//           return (
//             <div>
//               <h2>{curMovie.Title}</h2>
//             </div>
//           )
//         })
//       }
//     </>
//   )
// }

// export default Movies
