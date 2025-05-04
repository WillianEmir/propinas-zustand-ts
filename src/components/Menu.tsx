import { usePropina } from "../stores/propinaStore"

export default function Menu() {

  const {menuItems, addConsumoItem} = usePropina()

  return (
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
  )
}
