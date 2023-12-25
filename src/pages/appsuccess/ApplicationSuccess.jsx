import React from 'react'
import { useLocation } from 'react-router-dom'


function ApplicationSuccess() {

  const location = useLocation();
  const createdApplicationId = location.state?.id
  

  return (
    <div className='application-success-container'>
        <p>Başvurunuz için teşekkür ederiz başvuru sorgula sekmesinden aşağıdaki kodu girerek başvurunuzun durumunu kontrol edebilirsiniz.</p>
        <p>Kodunuz:{createdApplicationId}</p>
    </div>
  )
}

export default ApplicationSuccess