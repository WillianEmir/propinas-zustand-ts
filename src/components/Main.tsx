import { useMemo } from "react";
import { tipOptions } from "../data/tipOptions";
import { MenuItem } from "../types";
import { usePropina } from "../stores/propinaStore";
import { Collapse, IconButton, List, ListItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { Delete } from "@mui/icons-material";

export default function Main() {

  const { menuItems, consumoItems, tip, addConsumoItem, deleteItem, saveOrden, setTip } = usePropina()

  const consumoLength = useMemo(() => consumoItems.length > 0, [consumoItems])

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

              <List>
                <TransitionGroup>
                  {consumoItems.map(item => (
                    <Collapse key={item.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            title="Delete"
                            onClick={() => deleteItem(item.id)}
                          >
                            <Delete sx={{color: 'red'}} />
                          </IconButton>
                        }
                      >
                        <div>
                          <p className="text-xl">{item.name} - ${item.price}</p>
                          <p className="font-bold text-[18px]">Cantidad: {item.quantity} - ${item.quantity * item.price}</p>
                        </div>
                      </ListItem>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>

              <div>

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
                        onChange={setTip}
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
                className="w-full text-center uppercase font-bold text-white bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-md p-4 text-xl mt-8 disabled:opacity-20 disabled:bg-neutral-800 disabled:cursor-auto"
                onClick={saveOrden}
                disabled={tip === 0}
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
