import { createFileRoute } from '@tanstack/react-router'
import TextInput from '../components/TextInput'
import Button from '@mui/material/Button';
import styles from './../styles/addEarningsPage.module.scss'
import { useState } from 'react'

export const Route = createFileRoute('/addEarnings')({
  component: RouteComponent,
})

function RouteComponent() {
  const [mileage, setMileage] = useState('')
  const [consumption, setConsumption] = useState('')
  const [time, setTime] = useState('')
  const [earnings, setEarnings] = useState('')

  const calcSalary = () => {
   console.log(time)
  }

  return <div className={styles.addEarningsWrapper}>
      <TextInput onChange={(e) => setMileage(e.target.value)} id='mileage' label='Пробіг' unitType='км'/>
      <TextInput onChange={(e) => setConsumption(e.target.value)} id='consumpion' label='Витрати' unitType='л/100км'/>
      <TextInput onChange={(e) => setTime(e.target.value)} id='time' label='Час' unitType='год'/>
      <TextInput onChange={(e) => setEarnings(e.target.value)} id='earnings' label='Заробіток' unitType='грн'/>
      <Button onClick={calcSalary} variant="contained">Порахувати</Button>
      </div>
}
