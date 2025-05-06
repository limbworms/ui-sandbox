import React from 'react';
import { useReducer } from 'react';
import {useDraggable} from '@dnd-kit/core';
import "./ConsoleFactory.css"


export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  // const [state, dispatch] = useReducer(reducer, {term:"", session_provider: "", userMessages: [], userMessagePointer: 0, messages: [],});
  const style = {
      ...props.style
    }

  style.transform = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;

  
  return (
    <div id={props.id} key={`${props.key}_div`} className={props.className} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div id="popBoxTitle" className="headerTitle" >
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="popBoxTitleHandle" className="callTitle"> {props.payload.number} </div>
        <div id="popBoxTitleCloseBox" className="control-box close-box" onClick={closeWindow}>
        <a id="popBoxTitleCloseInner" className="control-box-inner" ></a>
        </div>
      </div >
      {props.children}
      <div style={{paddingLeft: 5, paddingRight: 5, paddingBottom:5}}>
      {Object.entries(props.payload).map((key,value) => {
        // console.log(key, value)
        return(
        <p style={{marginBottom: 0, marginTop: 0}}>{key[0]}: {key[1]}</p>
        )
      })}
      </div>
    </div>
  )
}

function closeWindow(){
  console.log('hi-ho')
}




