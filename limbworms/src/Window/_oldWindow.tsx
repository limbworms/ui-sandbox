import React, {useState} from 'react';
// import {useDroppable} from '@dnd-kit/core';
import { DndContext} from '@dnd-kit/core';
import { Droppable } from "./Drop/Dropfield.jsx"
import { Draggable } from "./Draggables/ConsoleFactory.jsx"
// import { CallBox } from "../CallBox/CallBox.jsx";
import "./Window.css";

// import { Plasma } from "../assets/plasma.js";



export default class Window extends React.Component{
           constructor(props){
              super(props);
              // this.Ref = React.createRef();
              this.state = {
                isCalling: "hidden",
                Arrayids: new Array(),
                ArrayTargets: new Array(),
              }

              this.handleCallChange = this.handleCallChange.bind(this);
              this.getTheBoys = this.getTheBoys.bind(this);
              this.handleDragEnd = this.handleDragEnd.bind(this);
              this.populateDraggable = this.populateDraggable.bind(this);
              this.removeFromDraggable = this.removeFromDraggable.bind(this);
           }

  componentDidMount() {
    var _Arrayids = this.state.Arrayids
    _Arrayids.push("callbox")
    var _ArrayTargets = this.state.ArrayTargets

    const node = <Draggable   id="callbox"
                              parent="dropleft"
                              style = {{width:400,height:400,minWidth:400,maxWidth:400}}/>
    _ArrayTargets.push(node)

    this.setState({Arrayids: _Arrayids})
    this.setState({ArrayTargets: _ArrayTargets})

    console.log(this.state.Arrayids)
    console.log(this.state.ArrayTargets)
  }


  handleDragEnd(event){
    const {over} = event;

    // first check if something changed.
    if(over){
      console.log(over ? over.id : null);
    }

  }

  getTheBoys(){
    this.setState({isCalling : "visible"})  
    setTimeout(document.querySelector(".textField").focus(), 200);

  }

    handleCallChange(){
    if(this.state.isCalling=="hidden"){
      this.setState({isCalling: "visible"})
    } else{
    this.setState({isCalling: "hidden"})
    }  
  }


  render (){

    return  <>

      <DndContext onDragEnd={this.handleDragEnd}   sensors={}>
        <div  className="row-container"
              style={{display: "flex", flexDirection: "row",}}>
        <Droppable id={"dropleft"}>

          {this.state.ArrayTargets.map((item, index) => {
            console.log(item)
                      if (item.props.parent === "dropleft") {
                        return (item);
                      }
            return null;
            })}
        </Droppable>


        <Droppable id={"dropright"}>
          {this.state.ArrayTargets.map((item, index) => {
            console.log(item)
                      if (item.props.parent === "dropright") {
                        return (item);
                      }
            return null;
            })}
        </Droppable>
        </div>

      </DndContext>

    </>
  }
}