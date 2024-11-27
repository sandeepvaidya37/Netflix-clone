import React, { useEffect, useRef, useState } from 'react'
import "./TitleCards.css"
import cards_data from '../../assets/cards/Cards_data'
import { Link, Navigate } from 'react-router-dom'
const TitleCards = ({title, category}) => {

const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWIwMTBjN2QwYTY4ZDY0YjFjYjVjYTFhZTcyZjhjYyIsIm5iZiI6MTczMDczNzIwNy4yNjY0OTI2LCJzdWIiOiI2NThhYzM2OWRkMjU4OTcyMDI2YmY2YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VzF5O_eBrzs75suyoOsU1AfwlfcxCMivljGlAK1_zpc'
  }
};



const handleWheel = (event)=>{
  event.preventDefault;
  cardsRef.current.scrollLeft += event.deltaY;
}

const [apiData, setApiData] = useState([]);

useEffect(()=>{


  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
   
  cardsRef.current.addEventListener('wheel', handleWheel)


},[])

  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
           {apiData.map((card, index)=>{
              return <Link to={`/player/${card.id}`} className='card' key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.title}</p>
              </Link>
           })}
        </div>
    </div>
  )
}

export default TitleCards