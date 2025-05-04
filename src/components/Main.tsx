import { useMemo } from "react";
import { usePropina } from "../stores/propinaStore";
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

        <Menu />

        <div className="border-2 border-dashed rounded-md border-gray-300 px-5 relative min-h-30">

          <Transition show={!consumoLength}>
            <p className="text-xl font-extralight right-[40%] py-8 transition duration-100 ease-in-out data-closed:opacity-0 absolute">La ordén está vacia</p>
          </Transition>

          <Transition show={consumoLength}>
            <div className="transition duration-150 ease-in-out data-closed:opacity-0 data-enter:opacity-100">
              <h2 className="text-3xl font-bold text-center py-8">Consumo</h2>
              <div>
                {consumoItems.map(item => (
                  <TransitionChild unmount key={item.id}>
                    <div className="flex items-end justify-between py-5 border-b border-gray-300 transition ease-in-out data-closed:duration-200  data-closed:translate-x-full data-leave:duration-200  data-leave:translate-x-full">
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
                  </TransitionChild>
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
