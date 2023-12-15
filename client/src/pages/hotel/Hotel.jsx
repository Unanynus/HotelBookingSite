import React from 'react'
import './hotel.css';
import { Navbar } from "../../Components/navbar/Navbar";
import { Header } from "../../Components/header/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { MailList } from "../../Components/mailList/MailList";
import { Footer } from "../../Components/footer/Footer";
import { useState } from "react";



export const Hotel = () => {
  
  const [slideNumber, setSlideNumber] = useState(0);
  const [open , setOpen] = useState(false);
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) =>{
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) =>{
    let newSlideNumber;

    if(direction==='l'){
       newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1;
    }else{
       newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      
      <Navbar/>
      <Header type="list"/>
      <div className='hotelContainer'>
       { open && <div className='Slider'>
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow'onClick={()=>handleMove("l")}/>
              <div className='sliderWrapper'>
                  <img src={photos[slideNumber].src} alt='' className='sliderImg' />
              </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow'onClick={()=>handleMove("r")}/>
        </div>}
      <div className='hotelWrapper'>
        <button className='bookNow'>
          Reserve or Book Now!
        </button>
        <h1 className='hotelTitle'>Grand Hotel Taj</h1>
        <div className='hotelAddress'>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>Lal Bahadur Shastri St 01 Mumbai </span>
        </div>
        <span className='hotelDistance'>
          Excellent Location - 500m from GateWay Of India
        </span>
        <span className='hotelPriceHighlight'>
          Book a stay over Rs10000 at this property and get a free airport taxi
        </span>
        <div className='hotelImages'>
            {photos.map((photo, i)=>(
              <div className='hotelImgWrapper'>
                <img onClick={()=>handleOpen(i)}src={photo.src} alt='' className='hotelImg' />
              </div>
            ))}
        </div>
        <div className='hotelDetails'>
          <div className='hotelDetailsTexts'>
            <h1 className='hotelTitle'>
              Stay in the heart of Mumbai the most beautiful sealine and
              excusite seaface  
            </h1>
            <p className='hotelDesc'>
              Located a 5-minute drive from the Cht. Shivaji Mah Terminus, The Hotej Taj
              has accomodations with air conditionings and free Wifi.The units with hardwood
              floors and feature a fully equiped kitchenette
              with a microwave , a LED Panel TV, and private Bathroom with shower and 
              hairdryer. A mini fridge is also offered, as well as electric teapot and 
              a coffee machine. Popular points of interest near the apartment includes 
              .The Museum which include the great heritage of the indians and cultral 
              diversity on which the coutry has laid it's foundation and faces of revolution
              and the unsung heroes whose contribution are almost forgetten, the 
              Croffet market and the Library which holds infinite amount of wisdom, the 
              kala chowk where we have famous sculpture of shivaji maharaja. Then you watch 
              famous marine drive which happens to take away the breath of many poeple. The 
              nearest Airport is Chattrapati Shivaji Maharaj International Airport, which is 
              around 45km away , the property offers a paid airport shuttle service. 
            </p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>perfect for a 9-night stay!</h1>
            <span>
              Located in the real heart of mumbai, this property has an 
              excellent location score of 9.8!
            </span>
            <h2>
              <b>Rs 21000/</b> (9 nights)
              </h2>
            <button>Reserve or Book Now!!!</button>
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  </div>
  )
}
