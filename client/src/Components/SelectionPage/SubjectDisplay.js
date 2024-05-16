import React from 'react'
import AddAcademicYearPage from './AddAcademicYearPage'
import AddLecture from './AddLecturer'
import { useContext } from 'react'
import UserContext from '../../UserContext'
import SubjectPage from './SubjectPages'
import InchargePage from './InchargePage'


const SubjectDetails= () => {
  const value = useContext(UserContext)
  const [role] = value
  return (
    <div>
     <AddLecture userRole={role}/>
     <SubjectPage userRole={role}/>
     <InchargePage userRole={role}/>
    </div>
  )
}

export default SubjectDetails
