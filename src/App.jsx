import { useState } from 'react'
import './App.css'

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

  const handleUndo = (event) => {
    event.stopPropagation();

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

  const handleRedo = (event) => {
    event.stopPropagation();

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
    <div id="screen-zone" onClick={handleClickScreen}>

      <div className="infos" onClick={(e) => e.stopPropagation()}>
        <p>Quantidade de Cliques dados: {countClicks()}</p>
        <p>Quantidade de Pontos na tela: {listDots.length}</p>
      </div>

      <button
        onClick={handleUndo}
        disabled={listDots.length === 0}
      >
        Desfazer
      </button>

      <button
        onClick={handleRedo}
        disabled={listDotsUndo.length === 0}
      >
        Refazer
      </button>
      
      {listDots.map((item, index) => (
        <span
          key={index}
          style={{
            left: item.x,
            top: item.y,
          }}
          className="dot"
          title={item.count > 1 ? `Cliques: ${item.count}` : ''}
        ></span>
      ))}  

    </div>
  )
}

export default App
