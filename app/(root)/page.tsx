import React from 'react'
import fs from 'fs';
import path from 'path';
import HeroSection from '../src/Home/Heropage'
import AboutMe from '../src/About/Page'
import ProjectsSection from '../src/Project/Page'
import ServicesPage from '../src/ServicesPage/Page'
import ContactSection from '../src/Contact/Page'


async function getLocalData(fileName: string) {
  const filePath = path.join(process.cwd(), 'app/_data', fileName);
  const jsonData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(jsonData);
}

const page = async () => {
  // Fetch data on the server
  const projects = await getLocalData('projects.json');

  return (
     <div className="min-h-screen bg-[#0a0a0a]">
       <HeroSection/>
       <AboutMe/>
       <ProjectsSection initialProjects={projects}/>
       <ServicesPage/>
       <ContactSection/>
       
     </div>
  )
}

export default page
