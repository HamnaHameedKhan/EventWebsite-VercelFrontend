import React from 'react'
import Hero from '../Components/CommonComponents/Hero'
import EventList from '../Components/EventsComponents/EventList'
import SearchBar from '../Components/CommonComponents/SearchBar'
import NewsLetterSubscription from '../Components/CommonComponents/NewsLetterSubscription'
import Testimonials from '../Components/CommonComponents/Testimonials'
import SocialMediaIcons from '../Components/CommonComponents/SocialMediaIcons'
import BookingForm from '../Components/Forms/BookingForm'
import EventDetails from '../Components/EventsComponents/EventDetails'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <SearchBar/>
      <EventList/>
      <Testimonials/>
      <NewsLetterSubscription/>
      <SocialMediaIcons/>
 
    </div>
  )
}

export default HomePage
