import { useState } from 'react'
import './App.css'

import Button from './components/Button';

function App() {
  
  const [listDots, setListDots] = useState([]);
  const [listDotsUndo, setListDotsUndo] = useState([]);

  const addDot = (pointX, pointY) => {

    if(listDots.length !== 0){

      let dotExist = null;

      listDots.map((item, index) => {
        if(item.x === pointX && item.y === pointY){
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

      <div className="flex justify-center">
        <div className="w-auto flex gap-3 py-2 px-3" onClick={(e) => e.stopPropagation()}>
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
      
      {listDots.map((item, index) => (
        <span
          key={index}
          style={{
            left: item.x,
            top: item.y,
          }}
          className={`
            w-[5px] h-[5px]
            absolute
            bg-cyan-400
            rounded-full
            transform -translate-x-1/2 -translate-y-1/2
            hover:cursor-pointer
            hover:opacity-80`}
          title={item.count > 1 ? `Cliques: ${item.count}` : ''}
        ></span>
      ))}  

    </div>
  )
}

export default App
