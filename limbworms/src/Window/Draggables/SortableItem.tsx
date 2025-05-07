import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// import Item from "./Item";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
      ...props.style
    }

  // const attrs = JSON.parse(props.attr)
  // const style = {
    style.transform = CSS.Transform.toString(transform)


  return (
    <div
      id={props.id}
      key={props.keyname}
      className={props.className}
      style={style}
      ref={setNodeRef}
      {...attributes}

    >
      <div {...listeners} id="popBoxTitle" className="headerTitle" >
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="popBoxTitleHandle" className="callTitle"> {props.id} </div>
        <div id="popBoxTitleCloseBox" className="control-box close-box">
        <a id="popBoxTitleCloseInner" className="control-box-inner" ></a>
        </div>
      </div>
      <div>

      {
        // Object.keys(attrs).map((key) =>{
        //    return <p  style={{marginLeft:5, marginRight:5, marginBottom:0}}
        //               key={`${props.id}-${key}`}
        //           >
        //               {key}: {attrs[key]}
        //           </p>
        // })     
      }

      </div>


    </div>
  );
};

