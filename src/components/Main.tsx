import { useEffect, useMemo, useState } from "react";
import { menuItems } from "../data/db";
import { tipOptions } from "../data/tipOptions";
import { MenuItem } from "../types";
import { ConsumoItem } from "../types";

export default function Main() {

  const initalConsumo = () : ConsumoItem[] => {
    const storageConsumo = localStorage.getItem('consumoItems')
    return storageConsumo?.length ? JSON.parse(storageConsumo) : []
  }

  const initialTip = () : number => {
    const storagePropina = localStorage.getItem('tip');
    return storagePropina?.length ? JSON.parse(storagePropina) : 0
  }

  const [consumoItems, setConsumoItems] = useState<ConsumoItem[]>(initalConsumo);
  const [tip, setTip] = useState(initialTip);

  useEffect(() => {
    localStorage.setItem('consumoItems', JSON.stringify(consumoItems))
    localStorage.setItem('tip', JSON.stringify(tip))
  }, [consumoItems, tip])

  useEffect(() => {!consumoLength ? setTip(0) : ''}, [consumoItems]);

  const addConsumoItem = (plato: MenuItem) => {
    const existe = consumoItems.some(item => item.id === plato.id)

    if (existe) {
      setConsumoItems(consumoItems.map(
        item => item.id === plato.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      const newItem: ConsumoItem = { ...plato, quantity: 1 }
      setConsumoItems([...consumoItems, newItem])
    }
  }

  const consumoLength = useMemo(() => consumoItems.length > 0, [consumoItems])

  const deleteItem = (id: MenuItem['id']) => {
    if(consumoLength === false) {
      setTip(0)
    }
    setConsumoItems(consumoItems.filter(item => item.id !== id))
  }

  const subTotal = useMemo(
    () => consumoItems.reduce(
      (total, item) => total + (item.price * item.quantity), 0), [consumoItems]
  )

  const propina = useMemo(() => subTotal * tip, [consumoItems, tip])
  
  const totalPago = useMemo(() => subTotal + propina, [consumoItems, tip])
  
  const formatCurrency = (quantity : MenuItem['price']) => {
    return new Intl.NumberFormat('en-US', {
      style: "currency",
      currency: 'USD'
    }).format(quantity)
  }

  const saveOrden = () => {
    setConsumoItems([])
    setTip(0)
  }

  return (
    <main>
      <div className="container mx-auto grid grid-cols-2 gap-x-5 max-md:grid-cols-1 px-2 my-8">
        <div>

          <h2 className="text-3xl font-bold text-center py-8">Menú</h2>

          {menuItems.map(plato => (

            <button
              className="flex justify-between border-3 border-teal-400 p-3 rounded-md cursor-pointer hover:bg-teal-200 transition-colors shadow mb-4 max-[420px]:flex-col w-full"
              key={plato.id}
              onClick={() => addConsumoItem(plato)}
            >
              <p className="text-xl">{plato.name}</p>

              <p className="text-xl font-bold">${plato.price}</p>
            </button>
          ))}
        </div>

        <div className="border-2 border-dashed rounded-md border-gray-300 px-5">

          {consumoLength ? (
            <>
              <h2 className="text-3xl font-bold text-center py-8">Consumo</h2>
              <div>
                {consumoItems.map(item => (
                  <div key={item.id} className="flex items-end justify-between py-5 border-b border-gray-300">
                    <div>
                      <p className="text-xl">{item.name} - ${item.price}</p>
                      <p className="font-bold text-[18px]">Cantidad: {item.quantity} - ${item.quantity * item.price}</p>
                    </div>
                    <button
                      className="size-8 rounded-full bg-red-500 font-bold text-white cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-2xl font-bold pt-8 pb-2">Propina:</h3>
                <form className="*:text-[18px] flex flex-col">
                  {tipOptions.map(tip => (
                    <div key={tip.id}>
                      <label htmlFor={tip.id}>{tip.label} </label>
                      <input
                        type="radio"
                        name="tip"
                        id={tip.id}
                        value={tip.value}
                        onChange={e => setTip(+e.target.value)}
                      />
                    </div>
                  ))}
                </form>
              </div>

              <div>
                <h3 className="text-2xl font-bold pt-8">Totales y Propina:</h3>
                <p className="text-[18px] py-1">Subtotal a pagar: {formatCurrency(subTotal)} </p>
                <p className="text-[18px] py-1">Propina: {formatCurrency(propina)}</p>
                <p className="text-[18px] py-1">Total a pagar: {formatCurrency(totalPago)}</p>
              </div>

              <button 
                className="w-full text-center uppercase font-bold text-white bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-md p-4 text-xl mt-8"
                onClick={saveOrden}
              >
                Guardar Orden
              </button>
            </>
          ) : (
            <p className="text-xl font-extralight text-center py-8">La ordén está vacia</p>
          )}

        </div>
      </div>
    </main >
  )
}
