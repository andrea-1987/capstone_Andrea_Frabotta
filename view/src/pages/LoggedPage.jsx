import React from 'react'
import { MainLayout } from '../layout/MainLayout'
import { WorksContent } from '../components/workContent/WorksContent'
import { SidebarWithSearch } from '../components/sidebar/SideBar'
import { jwtDecode } from 'jwt-decode'

const LoggedPage = () => {
    const session = localStorage.getItem("auth")
    const decodedSession=jwtDecode(session)
  return (
      <MainLayout class="justify-center mx-2">
      <div class="flex mx-2">
    <SidebarWithSearch/>
    <WorksContent />
  </div>
  </MainLayout>
  )
}

export default LoggedPage