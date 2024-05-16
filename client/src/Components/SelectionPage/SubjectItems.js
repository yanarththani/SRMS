import React from 'react'
import AddAcademicYearPage from './AddAcademicYearPage'

import { useContext } from 'react'
import UserContext from '../../UserContext'
const SubjectItems = () => {
  const value = useContext(UserContext)
  const [role] = value
  return (
    <div>
      <AddAcademicYearPage userRole={role}/>
      
      </div>
  )
}

export default SubjectItems
