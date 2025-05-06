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

  import { arrayMove } from "@dnd-kit/sortable";


import type { MouseEvent, TouchEvent } from 'react';
import { Droppable } from "./Drop/Dropfield.jsx"
import { Draggable } from "./Draggables/DragFactory.jsx"
import { Console } from "./Draggables/ConsoleFactory.jsx"
// import { CallBox } from "../CallBox/CallBox.jsx";
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

    const [items, setItems] = useState({
      dropleft: ["Console"],
      dropright: [],
    });

    // const [items, setItems] = useState({
    const [itemAttrs, setItemAttrs] = useState({
      dropleft: [{key:"Console", read: {id:"Console", type:"Console", className:"content console", key:"Console", parent:"dropleft", style:{width:400,height:320,minWidth:400,zIndex:4}}}],
      dropright: [],
    });

    const [activeId, setActiveId] = useState();

    const [, updateState] = useState();

    const handleArrayTargetsChange = (event) => {
      console.dir(event)
      setArrayTargetsState(event);
      // console.log(arrayTargetsState)
      // arrayTargetsState.map((x) => {
      //   console.log(x)
      // })
    };

    const handleArrayIdsChange = (event) => {
      console.log('1')
      console.log(event)
      setIdCallingState(event)
      // console.log(arrayIdsState)
      // arrayIdsState.map((x) => {
      //   console.log(x)
      // })
      // setArrayIdsState(JSON.parse(event));

    };    




    // useEffect(() => {
      // var _Arrayids = arrayIdsState;
      // var _ArrayTargets = arrayTargetsState;

      // const node = <Draggable   id="callbox"
      //                           key="callbox"
      //                           parent="dropleft"
      //                           style = {{width:400,height:400,minWidth:400,maxWidth:400}}/>

      // _Arrayids.push("callbox")
      // _ArrayTargets.push(node)

      // setArrayIdsState(_Arrayids)
      // setArrayTargetsState(_ArrayTargets)


      // return() => {
      //       console.log(arrayIdsState)
      //       console.log(setArrayTargetsState) 
      //       forceUpdate();
      // }

    // }, []);



  const getArrayTargetsState = () => {
    setArrayTargetsState(arrayTargetsState);
  };

    useEffect(() => {
      console.log('something changed')
  // This runs on mount *and also* if either a or b have changed since the last render
      if(arrayTargetsState.length===0){
        getArrayTargetsState()
      }
    }, [arrayIdsState, arrayTargetsState]);


    function handleDragStart(event) {
      const { active } = event;
      const { id } = active;

    //   console.dir(id)

      setActiveId(id);
    }

  function findContainer(id) {

    if (id in items) {
      return id;
    }


    // Object.keys(items).map((key) => {
      // for (let i = 0; i < items[key].length; i++) {
        // if(items[key][i].id===id){
          // heldVal = items[key][i].id
          // heldVal = key
        // }
      // } 
      // console.log(key)
      // console.dir(items[key])
    // })    
    // console.log(heldVal)
    // return heldVal
    // console.log('nada')
    return Object.keys(items).find((key) => items[key].includes(id));
  }


  // function handleDragOver(event) {
  //   const { active, over, draggingRect } = event;
  //   const { id } = active;
  //   const { id: overId } = over;


  //   const activeContainer = findContainer(id);
  //   const overContainer = findContainer(overId);


  //   if (
  //     !activeContainer ||
  //     !overContainer ||
  //     activeContainer === overContainer
  //   ) {
  //     return;
  //   }

  //   setItems((prev) => {
  //     console.dir(prev)
  //     console.dir(activeContainer)
  //     console.log(prev.activeContainer)
  //     const activeItems = prev[activeContainer];
  //     const overItems = prev[overContainer];

  //     // Find the indexes for the items
  //     const activeIndex = activeItems.indexOf(id);
  //     const overIndex = overItems.indexOf(overId);

  //     let newIndex;
  //     if (overId in prev) {
  //       // We're at the root droppable of a container
  //       newIndex = overItems.length + 1;
  //     } else {
  //       const isBelowLastItem =
  //         over &&
  //         overIndex === overItems.length - 1 &&
  //         draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //       const modifier = isBelowLastItem ? 1 : 0;

  //       newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  //     }

  //     return {
  //       ...prev,
  //       [activeContainer]: [
  //         ...prev[activeContainer].filter((item) => item !== active.id),
  //       ],
  //       [overContainer]: [
  //         ...prev[overContainer].slice(0, newIndex),
  //         items[activeContainer][activeIndex],
  //         ...prev[overContainer].slice(newIndex, prev[overContainer].length),
  //       ],
  //     };
  //   });


  //   setItemAttrs((prev) => {
  //     console.dir(prev)
  //     console.dir(activeContainer)
  //     console.log(prev.activeContainer)
  //     const activeItems = prev[activeContainer];
  //     const overItems = prev[overContainer];

  //     // Find the indexes for the items
  //     const activeIndex = activeItems.indexOf(id);
  //     const overIndex = overItems.indexOf(overId);

  //     let newIndex;
  //     if (overId in prev) {
  //       // We're at the root droppable of a container
  //       newIndex = overItems.length + 1;
  //     } else {
  //       const isBelowLastItem =
  //         over &&
  //         overIndex === overItems.length - 1 &&
  //         draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

  //       const modifier = isBelowLastItem ? 1 : 0;

  //       newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  //     }

  //     return {
  //       ...prev,
  //       [activeContainer]: [
  //         ...prev[activeContainer].filter((item) => item !== active.id),
  //       ],
  //       [overContainer]: [
  //         ...prev[overContainer].slice(0, newIndex),
  //         items[activeContainer][activeIndex],
  //         ...prev[overContainer].slice(newIndex, prev[overContainer].length),
  //       ],
  //     };
  //   });





  // }


  function handleDragEnd(event) {
    const { active, over } = event;

    // console.dir(active,over)

    const { id } = active;
    const { id: overId } = over;

    // console.log( id, overId)

    const activeContainer = findContainer(id);
    // const activeContainer = findWithinContainer(id)
    const overContainer = findContainer(overId);

    // console.log(activeContainer, overContainer)

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    // console.dir(items[activeContainer])
    // console.dir(items[overContainer])

    // var activeIndex = -1;
    // for (let i = 0; i < items[activeContainer].length; i++) {
    //   if(items[activeContainer][i].id===id){
    //     // heldVal = items[key][i].id
    //     activeIndex = i;
    //   }
    // } 

    // var overIndex = -1;
    // for (let i = 0; i < items[overContainer].length; i++) {
    //   if(items[overContainer][i].id===id){
    //     // heldVal = items[key][i].id
    //     overIndex = i;
    //   }
    // } 

      // console.log(key)
      // console.dir(items[key])
    const activeIndex = items[activeContainer].indexOf(active.id); //this is the index within the items array @ the id. our example, we need to check the index manually.
    const overIndex = items[overContainer].indexOf(overId);

    // console.log(activeIndex, overIndex)

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));

      console.log(itemAttrs[overContainer],activeIndex,overIndex )

      setItemAttrs((itemAttrs) => ({
        ...itemAttrs,
        [overContainer]: arrayMove(
          itemAttrs[overContainer],
          activeIndex,
          overIndex
        ),
      }));      
    }
      console.log(itemAttrs)


    setActiveId(null);
  }




    // function handleDragEnd(event){
    //   const {over} = event;

    //   if(over){
    //     console.log(over ? over.id : null);
    //     const childNode = document.querySelector(`#${event.active.id}`)
    //     const newParent = document.querySelector(`#${over.id}`)
    //     newParent.appendChild(childNode);
    //     // console.dir(childNode)
    //   }

    // }


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
          collisionDetection={closestCorners}
          // onDragStart={handleDragStart}
          // onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          >

          {/*<Droppable key={"dropleft"} id={"dropleft"} style = {{  flex: 1,minHeight:800, background:"red",}} items={items.dropleft}/>*/}
          {/*<Droppable key={"dropright"} id={"dropright"} style = {{  flex: 1,minHeight:800, background:"blue",}} items={items.dropright}/>*/}

          <Droppable key={"dropleft"} id={"dropleft"} style = {{  flex: 1,minHeight:800, background:"red",}} items={items.dropleft} itemAttrs={itemAttrs.dropleft}/>
          <Droppable key={"dropright"} id={"dropright"} style = {{  flex: 1,minHeight:800, background:"blue",}} items={items.dropright} itemAttrs={itemAttrs.dropright}/>
          {/*<DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>*/}

        </DndContext>
      </div>

    </>
    );
  }
