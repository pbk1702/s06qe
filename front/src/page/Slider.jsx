import { useState } from "react";
import { NavLink } from "react-router";
 
const slides = [
  { 
    name: "Акции",
    img: "slide_actions.jpg",
    to: "/products",
  },
  { 
    name: "Новинки",
    img: "slide_news.jpg",
    to: "/products",
  },
  {
    name: "События",
    img: "slide_events.jpg",
    to: "/events",
  },
]


const Component = () => {
  
  const [index, setIndex] = useState(0);  
  
  const handleSlide = ( value ) => {    
    const l = slides.length;
    let n = index + value;
    if( n >= l ) 
      n = 0
    else if ( n < 0 )
      n = l - 1;    
    setIndex ( n ) ;
  }

  return (
    <>
    <div className="relative overflow-x-hidden">
      <div
        className="flex flex-row flex-nowrap transition-transform"
        style={{
          width: `calc(100% * ${ slides.length })`,
          transform: `translateX( calc(-100% * ${index} / ${slides.length }) )`,
        }}
      >
      {
        slides.map( (v, ix) => {
          return (
          <div key={ ix } className="flex-flex-col" style={{ width: `calc( 100% / ${ slides.length } )` }}>
            <NavLink to={v.to}>              
              <img src={ "/".concat(v.img) } alt={v.img} className="w-full h-auto object-cover"/>
              <div className="absolute top-[50%] text-center w-full p-4 bg-amber-100 opacity-80 text-black font-bold">{v.name ?? ""}</div>
            </NavLink>
          </div>
          )
        })
      }
      </div>
      <div className="flex flex-row justify-center space-x-2 mt-2">
        <button onClick={ () => handleSlide(-1) }>&lt;</button>
        <button onClick={ () => handleSlide( 1) }>&gt;</button>
      </div>
    </div>

    </>
  )
}

export default Component;