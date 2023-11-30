import { DayObject } from '@/lib/utils'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

function DayCell({dayDetails}:{dayDetails:DayObject}) {
    const {date,day}=dayDetails
  return (
   <Card>
    <CardHeader>
        <CardTitle>{day}</CardTitle>
        <CardDescription>{date}</CardDescription>
    </CardHeader>
   </Card>
  )
}

export default DayCell