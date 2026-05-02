import React from 'react'
import HeroSection from '../_Components/Home/Heropage'
import AboutMe from '../_Components/About/Page'
import ProjectsSection from '../_Components/Project/Page'
import ServicesPage from '../_Components/ServicesPage/Page'
import ContactSection from '../_Components/Contact/Page'
import TestimonialsShow from '../_Components/Testimonels/Testimonials'

const page = () => {
  return (
     <div className="min-h-screen bg-[#0a0a0a]">
       <HeroSection/>
       <AboutMe/>
       <ProjectsSection/>
       <ServicesPage/>
       <ContactSection/>
       <TestimonialsShow/>
     </div>
  )
}

export default page
