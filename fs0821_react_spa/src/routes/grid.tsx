import { KeyboardEvent, useContext, useState } from 'react';
import Clock from '../components/clock'
import { GridContext } from '../providers/grid';
export default function Grid() {

  const { state: { grid, code, generating, bias }, toggleGenerating = () => {}, setBias = () => {} } = useContext(GridContext);
  const [biasEnabled, setBiasEnabled] = useState(true);
  

  function onChangeBias(event: KeyboardEvent<HTMLInputElement>) {
    const key = event.key.toLocaleLowerCase()
    if (key.match(/^[a-z]$/)) {
      setBias(key)
      setBiasEnabled(false)
      setTimeout(() => setBiasEnabled(true), 4000)  
    } else {
      setBias('')
    }
  }


  return (

      <div className="container mx-auto py-4">
        
        <div className="flex flex-row justify-between align-bottom">
          <form>
            <label htmlFor="bias" className="block text-xs uppercase font-bold opacity-50">character</label>
            <input name="bias" value={bias} onChange={() => {}} onKeyDown={(event) => onChangeBias(event)} disabled={!biasEnabled} className="form-control border p-2 w-24" placeholder="Character" />
          </form>
          
          <Clock />
          
          <button className="border p-0 px-8 text-xs bg-slate-500 text-white font-bold h-10 rounded-md uppercase" onClick={() => toggleGenerating()}>
            { !generating ? 'generate 2d grid' : 'stop generator'}
          </button>

        </div>

        <div className="p-2" ></div>
        <div className="grid grid-cols-10">
          { grid.map((cell, index) => (
            <div className="border text-center p-2 whitespace-pre" key={index}>
              { cell }
            </div>  
          ))}
        </div>
        <div className="p-2" ></div>
        <div className="flex flex-row justify-center">
          <div className="w-fit justify-center font-bold text-sm" >
            <div className={`w-2 h-2 inline-block rounded-lg ${generating ? 'bg-green-500' : 'bg-red-200'}`} ></div>
            <div className="p-2 inline-block">LIVE </div>
          </div>
        </div>
        <div className="p-2" ></div>
        <div className="flex flex-row justify-center">
          <div className="border-2 p-4 px-16 w-fit justify-center text-sm" >YOUR CODE: <span className="font-bold">{ code }</span></div>
        </div>
        
      </div>


    );
  }