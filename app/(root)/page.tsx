import React from 'react'
import HeroSection from '../_Components/Home/Heropage'
import AboutMe from '../_Components/About/Page'
import ProjectsSection from '../_Components/Project/Page'
import ServicesPage from '../_Components/ServicesPage/Page'
import ContactSection from '../_Components/Contact/Page'
import TestimonialsShow from '../_Components/Testimonels/Testimonials'
import TestimonialsWrite from '../_Components/Testimonels/TestimonialsWrite'


const page = () => {
  return (
     <div className="min-h-screen bg-black bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" >

<HeroSection/>
<AboutMe/>
<ProjectsSection/>
<ServicesPage/>
<ContactSection/>
<TestimonialsShow/>
<TestimonialsWrite/>


    </div>
  )
}

export default page
