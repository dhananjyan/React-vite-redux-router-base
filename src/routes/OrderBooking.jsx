import { useEffect } from 'react'
import OrderBookingComponent from '../components/OrderBooking/OrderBooking'
import { useDispatch } from 'react-redux'
import { initializePage } from '../store/features/orderBooking';

export default function OrderBooking() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePage())
  }, [])

  return (
    <OrderBookingComponent />
  )
}
