import PlansList from '@/components/features/plans-list'
import { getPlansByUser } from '@/server/plans'
import React from 'react'

const page = async () => {

  const plans = await getPlansByUser()
  if(!plans) {
    return (
      <div>
        <p>No plans found</p>
      </div>
    )
  }
  
  return (
    <div className='p-20  flex justify-center items-center'>
      <PlansList plans={plans} />
    </div>
  )
}

export default page