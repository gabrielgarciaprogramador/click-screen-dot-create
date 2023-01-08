import { useState } from 'react'
import './App.css'

import Button from './components/Button';
import Tooltip from './components/Tooltip';

function App() {
  
  const [listDots, setListDots] = useState([]);
  const [listDotsUndo, setListDotsUndo] = useState([]);

  const sizeDot = 5;

  const addDot = (pointX, pointY) => {

    if(listDots.length !== 0){

      let dotExist = null;

      listDots.map((item, index) => {
        if(
          (pointX <= item.x + sizeDot/2 && pointX >= item.x - sizeDot/2) &&
          (pointY <= item.y + sizeDot/2 && pointY >= item.y - sizeDot/2)
        ){
          dotExist = index;
        }
      })

      if(dotExist){

        let newListDots = [...listDots];
        newListDots[dotExist] = {
          ...newListDots[dotExist],
          count: newListDots[dotExist].count + 1,
        }
        setListDots(newListDots);
        return;

      }
    }

    const newDot = {
      x: pointX,
      y: pointY,
      count: 1
    }

    setListDots((prev) => [...prev, newDot])

  }

  const handleClickScreen = (event) => {

    setListDotsUndo([]);
    addDot(event.clientX, event.clientY);

  }

  const handleUndo = () => {

    if(listDots.length === 0){
      return;
    }

    let dotUndo = listDots[listDots.length - 1];

    setListDotsUndo((prev) => [...prev, {
      x: dotUndo.x,
      y: dotUndo.y,
    }])

    if(dotUndo.count > 1){
      let newListDots = [...listDots]
      let lastDotsNewList = newListDots[newListDots.length - 1]

      lastDotsNewList = {
        ...lastDotsNewList,
        count: lastDotsNewList.count - 1
      }

      newListDots[newListDots.length - 1] = lastDotsNewList;

      setListDots(newListDots)

      return;
    }
    setListDots(listDots.slice(0, -1))

  }

  const handleRedo = () => {

    if(listDotsUndo.length === 0){
      return;
    }

    const itemRedo = listDotsUndo[listDotsUndo.length - 1];

    addDot(itemRedo.x, itemRedo.y);
    
    setListDotsUndo(listDotsUndo.slice(0, -1))

  }

  const countClicks = () => {

    let count = 0;
    
    listDots.map((item) => {
      count = count + item.count;
    })

    return count;

  }

  return (
    <div
      className="w-full h-full flex flex-col justify-between relative bg-gray-800"
      onClick={handleClickScreen}
    >

      <div className="flex justify-center">
        <div className="w-auto flex gap-5 py-2 px-3" onClick={(e) => e.stopPropagation()}>
          <span className="text-white text-sm">Quantidade de Cliques dados: <b>{countClicks()}</b></span>
          <span className="text-white text-sm">Quantidade de Pontos na tela: <b>{listDots.length}</b></span>
        </div>
      </div>

      {listDots?.length === 0 && (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center text-center cursor-default">
            <h3 className="text-gray-600 text-4xl font-bold tracking-wide uppercase mb-2">Clique em qualquer lugar da tela</h3>
            <h4 className="text-gray-600 text-2xl font-semibold">e começe a brincar</h4>
          </div>
        </div>
      )}

      {listDots?.map((item, index) => {
        let bgColorDot = "bg-cyan-700";

        if(item.count > 1){
          bgColorDot = "bg-cyan-500";
        }
        if(item.count > 5){
          bgColorDot = "bg-cyan-400";
        }
        if(item.count > 10){
          bgColorDot = "bg-cyan-200";
        }
        
        return(
          <Tooltip
            content={item.count > 1 ? `Cliques: ${item.count}` : ''}
            disabled={item.count <= 1}
            key={index}
          >
            <span
              style={{
                left: item.x,
                top: item.y,
                width: sizeDot,
                height: sizeDot,
              }}
              className={`
                absolute
                ${bgColorDot}
                rounded-full
                transform -translate-x-1/2 -translate-y-1/2
                hover:cursor-pointer
                hover:opacity-80`}
            ></span>
          </Tooltip>
        )}
      )}

      <div className="flex justify-center">
        <div className="w-auto inline-flex gap-3 py-2 px-3" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={handleUndo}
            disabled={listDots.length === 0}
          >
            Desfazer
          </Button>

          <Button
            onClick={handleRedo}
            disabled={listDotsUndo.length === 0}
          >
            Refazer
          </Button>
        </div>
      </div>  

    </div>
  )
}

export default App
