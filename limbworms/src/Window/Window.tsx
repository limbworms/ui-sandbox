import React, {useEffect, useState, useCallback} from 'react';
// import {useDroppable} from '@dnd-kit/core';
import { 
  DndContext, 
  closestCorners, 
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,} from '@dnd-kit/core';

  // import { arrayMove } from "@dnd-kit/sortable";


import type { MouseEvent, TouchEvent } from 'react';
import { Droppable } from "./Drop/Dropfield.jsx"
import { Draggable } from "./Draggables/DragFactory.jsx"
import { Console } from "./Draggables/ConsoleFactory.jsx"

import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";













import "./Window.css";

// import { Plasma } from "../assets/plasma.js";
const IGNORE_TAGS = ["A","INPUT"];

// Block Dnd, if IGNORE_TAGS includes elements tag or element has data-no-dnd attribute
const customHandleEvent = (element: HTMLElement | null) => {
  let cur = element;

  while (cur) {
    if (IGNORE_TAGS.includes(cur.tagName) || cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

MouseSensor.activators = [
  {eventName: 'onMouseDown',
    handler: ({ nativeEvent: event }: MouseEvent) => customHandleEvent(event.target as HTMLElement),
  },];

TouchSensor.activators = [
  {eventName: 'onTouchStart',
    handler: ({ nativeEvent: event }: TouchEvent) => customHandleEvent(event.target as HTMLElement),
  },];





export default function Window(props){
    const forceUpdate = useCallback(() => updateState({}), []);
    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
  
    const sensors = useSensors(
      mouseSensor,
      touchSensor,
    );
    const [arrayIdsState, setArrayIdsState] = useState(new Array())
    const [arrayTargetsState, setArrayTargetsState] = useState(new Array())
    const [isCallingState, setIdCallingState] = useState("hidden");

          // <Console id="Console" className="content console"
          //                         key="Console"
          //                         parent={"dropleft"}
          //                         arrayIdsState={arrayIdsState}
          //                         arrayTargetsState={arrayTargetsState}
          //                         setArrayIdsState={handleArrayIdsChange}
          //                         setArrayTargetsState={handleArrayTargetsChange}
          //                         style = {{width:400,height:320,minWidth:400,zIndex:4}}/>


    const groupStyles = {dropleft:{flex: 1,minHeight:800, background:"red"},dropright:{flex: 1,minHeight:800, background:"blue"}}

    const [itemGroups, setItemGroups] = useState({
      dropleft: ["Console"],
      dropright: [],
    });

    // const [items, setItems] = useState({
    const [itemAttrs, setItemAttrs] = useState({
      dropleft: [{key:"Console", read: {id:"Console", type:"Console", className:"content console", key:"Console", parent:"dropleft", style:{width:400,height:320,minWidth:400,zIndex:4}}}],
      dropright: [],
    });


  const [activeId, setActiveId] = useState(null);

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    console.dir(active)
    console.dir(over)

    const activeContainer = active.data.current.sortable.containerId; //adapt this
    const overContainer = over.data.current?.sortable.containerId || over.id; //adapt that

    if (activeContainer !== overContainer) {
      setItemGroups((itemGroups) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          itemGroups,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      console.log(active.data.current.sortable.containerId)
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemGroups((itemGroups) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...itemGroups,
            [overContainer]: arrayMove(
              itemGroups[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            itemGroups,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }

        return newItems;
      });
    }

    setActiveId(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    return {
      ...items,
      [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
    };
  };






    function getTheBoys(){
      setIsCallingState("visible");
      setTimeout(document.querySelector(".textField").focus(), 200);

    }

    function handleCallChange(){
      if(isCallingState=="hidden"){
        setIsCallingState("visible");
      } else{
        setIsCallingState("hidden");
      }  
    }

    return(  <>
      <div  className="row-container"
            style={{display: "flex", flexDirection: "row",}}>
        <DndContext 
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >

          {Object.keys(itemGroups).map((group) => (
            <Droppable  key={group} 
                        id={group} 
                        activeId={activeId}
                        style = {groupStyles[group]} 
                        items={itemGroups[group]} 
                        itemAttrs={itemAttrs[group]}/>
            ))}

        <DragOverlay>
          {activeId ? <Console id={activeId} dragOverlay /> : null}
        </DragOverlay>
        </DndContext>
      </div>

    </>
    );
  }
