import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import {Console} from "../Draggables/ConsoleFactory.tsx"
import {SortableItem} from "../Draggables/SortableItem.tsx"


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

        {items.map((item_obj, index) => {
          console.log(item_obj, index, id)

          if(item_obj.startsWith("Console")){
            return <Console   id={item_obj} 
                              key={item_obj} 
                              className={"console content"}
                              group={props.id}
                              stateItems={props.stateItems}
                              stateItemAttrs={props.stateItemAttrs}
                              setStateItemGroups={props.setStateItemGroups}
                              setStateItemAttrs={props.setStateItemAttrs}
                              style = {{width:400,height:260,minWidth:400,zIndex:4}}
                    />

            }else if(!item_obj.startsWith("Console")){
              // console.log(itemAttrs[index])
             // var attrKeys = new Array()
             // var attrVals = new Array()
             // Object.keys(itemAttrs[index]).map((key) => {
             //  attrKeys.push(key);
             //  attrVals.push(itemAttrs[index][key])
             // })
             // console.log(attrKeys)
             // console.log(attrVals)
              // console.dir(JSON.parse(itemAttrs[index]))
             return <SortableItem className={"content"} key={item_obj} keyname={item_obj} id={item_obj} attr={itemAttrs[index]} style={{width:400,height:310,minWidth:400,zIndex:4}}>{item_obj}</SortableItem>
            }
          })
        }

      </div>
    </SortableContext>
  );
}
