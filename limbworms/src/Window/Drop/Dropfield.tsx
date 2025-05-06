import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import {Console} from "../Draggables/ConsoleFactory.tsx"

const console_component = <Console />;
                          // id="Console" 
                          // className="content console"
                          // key="Console"
                          // parent={"dropleft"}
                          // arrayIdsState={arrayIdsState}
                          // arrayTargetsState={arrayTargetsState}
                          // setArrayIdsState={handleArrayIdsChange}
                          // setArrayTargetsState={handleArrayTargetsChange}
                          // style = {{width:400,height:320,minWidth:400,zIndex:4}}/>


export function Droppable(props) {
  const { id, items, itemAttrs } = props;

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={items}
      itemAttrs={itemAttrs}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef} style={props.style}>

        {items.map((item_obj) => {
              return <Console   id={item_obj} 
                                key={item_obj} 
                                className={"content"} 
                      />
          })
          // <SortableItem key={id} id={id} />
        }



{/*        {items.length===itemAttrs.length ? items.map((item_obj, index) => {
          if(itemAttrs[index].key==="Console"){
              return <Console   id={itemAttrs[index].read.id} 
                                key={itemAttrs[index].read.key} 
                                className={itemAttrs[index].read.className}
                                style = {itemAttrs[index].read.style}
                      />
          }
          // <SortableItem key={id} id={id} />
        })
        : null}*/}
      </div>
    </SortableContext>
  );
}
