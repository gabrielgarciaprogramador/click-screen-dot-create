import { useState } from 'react'
import './App.css'

function App() {
  
  const [listDots, setListDots] = useState([]);
  const [listDotsUndo, setListDotsUndo] = useState([]);

  const handleClick = (event) => {

    setListDotsUndo([]);

    if(listDots.length !== 0){

      let dotExist = null;

      listDots.map((item, index) => {
        if(item.x === event.clientX && item.y === event.clientY){
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
      x: event.clientX,
      y: event.clientY,
      count: 1
    }

    setListDots((prev) => [...prev, newDot])

  }

  const handleUndo = (event) => {
    event.stopPropagation();

    if(listDots.length === 0){
      return;
    }

    let dotUndo = listDots[listDots.length - 1];

    setListDotsUndo((prev) => [...prev, dotUndo])
    setListDots(listDots.slice(0, -1))

  }

  const handleRedo = (event) => {
    event.stopPropagation();

    if(listDotsUndo.length === 0){
      return;
    }

    setListDots((prev) => [...prev, listDotsUndo[listDotsUndo.length - 1]])
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
    <div id="screen-zone" onClick={handleClick}>

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
