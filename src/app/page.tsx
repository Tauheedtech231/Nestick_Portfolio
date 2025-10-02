import React from 'react'
import Home from './(portfolio)/Home/page'
import AboutUs from './(portfolio)/About/page'
import ProgramsPage from './(portfolio)/Programms/page'
import AdmissionsSection from './(portfolio)/Admission/page'
import FacultyStaff from './(portfolio)/Faculty/page'
import GalleryPage from './(portfolio)/Gallery/page'

function page() {
  return (
    <div>
      <Home/>
      <AboutUs/>
      <ProgramsPage/>
      <AdmissionsSection/>
      <FacultyStaff/>
      <GalleryPage/>
      
    </div>
  )
}

export default page
