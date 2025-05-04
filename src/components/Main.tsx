import { useMemo } from "react";
import { usePropina } from "../stores/propinaStore";
import { Collapse, IconButton, List, ListItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { Delete } from "@mui/icons-material";
import Menu from "./Menu";
import Propina from "./Propina";
import Totales from "./Totales";
import { Transition, TransitionChild } from "@headlessui/react";

export default function Main() {

  const { consumoItems, tip, deleteItem, saveOrden } = usePropina()

  const consumoLength = useMemo(() => consumoItems.length > 0, [consumoItems])


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

              <Propina />

              <Totales />

              <button
                className="w-full text-center uppercase font-bold text-white bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-md p-4 text-xl mt-8 disabled:opacity-20 disabled:bg-neutral-800 disabled:cursor-auto"
                onClick={saveOrden}
                disabled={tip === 0}
              >
                Guardar Orden
              </button>
            </div>
          </Transition>

        </div>
      </div>
    </main >
  )
}
