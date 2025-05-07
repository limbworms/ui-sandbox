import React, {useEffect, useState, useCallback} from 'react';

import { 
  DndContext, 
  closestCorners, 
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,} from '@dnd-kit/core';

import type { MouseEvent, TouchEvent } from 'react';
import { Droppable } from "./Drop/Dropfield.jsx"
import { Draggable } from "./Draggables/DragFactory.jsx"
import { Console } from "./Draggables/ConsoleFactory.jsx"
import { Sidebar } from "./Component/Sidebar.jsx"
// import { Head } from "./Component/Head.jsx"

import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";
import "./Window.css";

// import { Plasma } from "../assets/plasma.js";
const IGNORE_TAGS = ["A","INPUT","BUTTON"];

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

MouseSensor.activators = [{eventName: 'onMouseDown', handler: ({ nativeEvent: event }: MouseEvent) => customHandleEvent(event.target as HTMLElement),},];
TouchSensor.activators = [{eventName: 'onTouchStart',handler: ({ nativeEvent: event }: TouchEvent) => customHandleEvent(event.target as HTMLElement),},];

export default function Window(props){
  const forceUpdate = useCallback(() => updateState({}), []);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);

  const sensors = useSensors(
    useSensor(MouseSensor, {
        activationConstraint: {
          distance: 8,
        },
      }),
      useSensor(TouchSensor, {
        activationConstraint: {
          delay: 200,
          tolerance: 6,
        },
      }),
  );

  const [isCallingState, setIdCallingState] = useState("hidden");
  const groupStyles = {dropleft:{flex: 1,minHeight:800, background:"#232326"},dropright:{flex: 1,minHeight:800, background:"#28282c"}}
  const [itemGroups, setItemGroups] = useState({
    dropleft: ["Console0"],
    dropright: ["Console1"],
  });

  const [itemAttrs, setItemAttrs] = useState({
    dropleft: [JSON.stringify({key:"Console0", read: {id:"Console0", type:"Console0", className:"content console", key:"Console0", parent:"dropleft", style:{width:400,height:320,minWidth:400,zIndex:4}}})],
    dropright: [JSON.stringify({key:"Console1", read: {id:"Console1", type:"Console1", className:"content console", key:"Console1", parent:"dropright", style:{width:400,height:320,minWidth:400,zIndex:4}}})],
  });

  const [boolHook, setBoolHook] = useState(false);
  const [activeId, setActiveId] = useState(null);


  // useEffect(() => {
  //   console.log('here 78')
  //   setItemAttrs(itemAttrs);
  //   setItemGroups(itemGroups);
  // },[itemGroups, itemAttrs])


  function handleArrayMutate(e) {
    setBoolHook(!boolHook);
  }



  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragCancel = () => setActiveId(null);
  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId; //adapt this
    const overContainer = over.data.current?.sortable.containerId || over.id; //adapt that

    if (activeContainer !== overContainer) {

      setItemAttrs((itemAttrs) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveAttrsBetweenContainers(
          itemAttrs,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });


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
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in itemGroups
          ? itemGroups[overContainer].length + 1
          : over.data.current.sortable.index;

      setItemAttrs((itemAttrs) => {
        const activeIndex = active.data.current.sortable.index;
        const overIndex =
          over.id in itemGroups
            ? itemGroups[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveAttrsBetweenContainers(
          itemAttrs,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });


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
      // ...items,
      // [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      // [overContainer]: insertAtIndex(items[overContainer], overIndex, item),

      ...items,
      [activeContainer]: [...items[activeContainer].filter((itemz) => itemz !== item),],
      [overContainer]: [...items[overContainer], items[activeContainer][activeIndex],],

    };
  };


  const moveAttrsBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {

    console.dir(items)
    return {
      // ...items,
      // [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
      // [overContainer]: insertAtIndex(items[overContainer], overIndex, item),

      ...items,
      [activeContainer]: [...items[activeContainer].filter((itemz) => JSON.parse(itemz).key !== item),],
      [overContainer]: [...items[overContainer], items[activeContainer][activeIndex],],


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
      {/*<Head />*/}
      <Sidebar/>
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
                        itemAttrs={itemAttrs[group]}
                        stateItems={itemGroups}
                        stateItemAttrs={itemAttrs}
                        setStateItemGroups={setItemGroups}
                        setStateItemAttrs={setItemAttrs}
                        onChange={handleArrayMutate}
                        />
            ))}

        <DragOverlay>
          {activeId ? <Console id={activeId} className={"console content"} style = {{width:400,height:260,minWidth:400,zIndex:4}} dragOverlay /> : null} 
        </DragOverlay>
        </DndContext>
      </div>

    </>
    );
  }
