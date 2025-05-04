import { useMemo } from 'react'
import { usePropina } from '../stores/propinaStore'
import { MenuItem } from '../types'

export default function Totales() {

  const {consumoItems, tip} = usePropina()

  const subTotal = useMemo(
      () => consumoItems.reduce((total, item) => total + (item.price * item.quantity), 0), [consumoItems]
    )
    const propina = useMemo(() => subTotal * tip, [consumoItems, tip])
    const totalPago = useMemo(() => subTotal + propina, [consumoItems, tip])
  
    const formatCurrency = (quantity: MenuItem['price']) => {
      return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: 'USD'
      }).format(quantity)
    }

  return (
    <div>
      <h3 className="text-2xl font-bold pt-8">Totales y Propina:</h3>
      <p className="text-[18px] py-1">Subtotal a pagar: {formatCurrency(subTotal)} </p>
      <p className="text-[18px] py-1">Propina: {formatCurrency(propina)}</p>
      <p className="text-[18px] py-1">Total a pagar: {formatCurrency(totalPago)}</p>
    </div>
  )
}
