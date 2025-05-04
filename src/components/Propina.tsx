import { tipOptions } from "../data/tipOptions"
import { usePropina } from "../stores/propinaStore"

export default function Propina() {

  const {setTip} = usePropina()

  return (
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
  )
}
