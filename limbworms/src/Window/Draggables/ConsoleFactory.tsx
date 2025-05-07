import React from 'react';
import { useEffect, useReducer, useRef } from 'react';
// import {useDraggable} from '@dnd-kit/core';
import { useSortable } from "@dnd-kit/sortable";



import { ethers } from "/Users/seanmoran/Projects/ui-sandbox/limbworms/node_modules/ethers/dist/ethers.min.js";
import {EtherscanProvider} from "./methods/EtherscanProvider.js"
import {v4 as uuidv4} from 'uuid';
import "./ConsoleFactory.css"



export function Console(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });




  // const {attributes, listeners, setNodeRef, transform} = useDraggable({
  //   id: props.id,
  // });

  const focusCall = useRef();
  const [state, dispatch] = useReducer(reducer, {term:"", session_provider: "http://localhost:8545", userMessages: [], userMessagePointer: 0, messages: [],});
  // const xform       transform ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,} : undefined,

  const style = {
      ...props.style
    }
  style.transform = transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined;

  
// new ethers.JsonRpcProvider("http://localhost:8545") 
  

async function onKeyPressHandler(e){
    // console.log(e)
    if (e.key === 'Enter') {
      console.dir(listeners)
      console.log('hey')
      const selectNode = document.querySelector("#talk");
      var pushUser = state.userMessages;
      pushUser.push(state.term);

      const node = document.createElement('p');
      node.innerHTML = "> " + `${state.term}`;
      document.querySelector("#talk").append(node);

      console.log(pushUser)
      dispatch({type:"userMessages", message: pushUser, pointer: pushUser.length})
    }
  }  

async function etherSpeak(e){
  switch(state.term.replace("ethers@","").trim()){
    case "spawn":
      var _store_ids = props.stateItems;
      var id_name = uuidv4();

      _store_ids[props.group].push(id_name);
      var _store_target = props.stateItemAttrs;
      var _store_json = new Object();
        _store_json.id = id_name
        _store_json.hash = "0x200b";
        _store_json.timestamp = "0x200b";
        _store_json.parentHash = "0x200b";
        _store_json.receiptsRoot = "0x200b";
        _store_json.stateRoot = "0x200b";
        _store_json.baseFeePerGas = "0x200b";
        _store_json.blobGasUsed = "0x200b";
        _store_json.difficulty = "0x200b";
        _store_json.excessBlobGas = "0x200b";
        _store_json.extraData = "0x200b";
        _store_json.gasLimit = "0x200b";
        _store_json.gasUsed = "0x200b";
        _store_json.miner = "0x200b";
        _store_json.nonce = "0x200b";
        _store_json.number = "0x200b";
        _store_json.parentBeaconBlockRoot = "0x200b";

      _store_target[props.group].push(JSON.stringify(_store_json));
      props.setStateItemGroups(_store_ids);
      props.setStateItemAttrs(_store_target);
      // console.log(props.arrayIdsState)
      console.log(props.stateItemAttrs)
      break;

    case "getTransactions":
      break;


    default:
        try{
          onKeyPressHandler(e)
          console.log(state.session_provider)
          const provider = new ethers.JsonRpcProvider(state.session_provider)
          provider.getBlock()
          .then(values => {
            console.dir(values)

            var _store_ids = props.arrayIdsState;
            var id_name = uuidv4();

            // var replyObject = {key:"Console", read: {id:"Console", type:"Console", className:"content console", key:"Console", parent:"dropleft", style:{width:400,height:320,minWidth:400,zIndex:4}

            _store_ids.push(id_name);
            var _store_target = props.arrayTargetsState;
            var _store_json = new Object();
              _store_json.id = id_name
              _store_json.hash = values.hash
              _store_json.timestamp = values.timestamp
              _store_json.parentHash = values.parentHash
              _store_json.receiptsRoot = values.receiptsRoot
              _store_json.stateRoot = values.stateRoot
              _store_json.baseFeePerGas = values.baseFeePerGas
              _store_json.blobGasUsed = values.blobGasUsed
              _store_json.difficulty = values.difficulty
              _store_json.excessBlobGas = values.excessBlobGas
              _store_json.extraData = values.extraData
              _store_json.gasLimit = values.gasLimit
              _store_json.gasUsed = values.gasUsed
              _store_json.miner = values.miner
              _store_json.nonce = values.nonce
              _store_json.number = values.number
              _store_json.parentBeaconBlockRoot = values.parentBeaconBlockRoot


            var _store_node = { key: id_name,  
                                read: { id:"Console", 
                                        type:"Console", 
                                        className:"content console", 
                                        key:"Console", 
                                        parent:"dropleft", 
                                        style:{width:400,height:320,minWidth:400,zIndex:2}, 
                                        contents: _store_json}}

            _store_target.push(_store_node);
            // _store_target.push(JSON.stringify(_store_json));
            props.setArrayIdsState(_store_ids);
            props.setArrayTargetsState(JSON.stringify(_store_target));
            console.log(props.arrayIdsState)
            console.log(props.arrayTargetsState)

            console.log("works")

          })
          .catch(error=> console.log(error));
          // provider.listAccounts()

          // const myEtherScanInstance = new MyEtherscanProvider();
          // myEtherScanInstance.getHistory(provider.getBlock).then(console.log);

        } catch (error){
          console.log(error)
          // const provider = new ethers.JsonRpcProvider()
        }
        console.log()
    } 
}



async function keyRouter(e){
    if (e.key === 'Enter'){

    document.querySelector(".userClass").classList.add("blink");
    document.querySelector(".textField").classList.add("blink");
    document.querySelector(".textField").disabled = true;

    if(state.term.startsWith("session@")){
        console.log(":^)")
        var payload = state.term.replace("session@","").trim();
        // const provider = new ethers.JsonRpcProvider(payload)
        dispatch({type:"change_session_provider", pobject: payload})
        onKeyPressHandler(e)

      } else if(state.term.startsWith(":help")){
        console.log()
       
      } else if(state.term.startsWith("ethers@")){
        etherSpeak(e);

      } else { 
        onKeyPressHandler(e)
      }
    console.dir(state)
    document.querySelector(".userClass").classList.remove("blink");
    document.querySelector(".textField").classList.remove("blink");
    document.querySelector(".textField").disabled = false;
    }
  }

  return (
    <div className={props.className} id={props.id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div id="popBoxTitle" className="headerTitle" >
        <div className="topTitleLine"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="titleLines"></div>
        <div className="bottomTitleLines"></div>
        <div id="popBoxTitleHandle" className="callTitle"> {props.id} </div>
        <div id="popBoxTitleCloseBox" className="control-box close-box" onClick={closeWindow}>
        <a id="popBoxTitleCloseInner" className="control-box-inner" ></a>
        </div>
      </div >

      {props.children} 
      <div id="talk">
      </div>
        {/*<pre id="talk">{this.state.written}</pre>  */}
        {/*<pre id="talk" style={{maxHeight: this.state.height-26-19}}>{this.state.written}</pre>*/}
      <div>
        {/*<p className="blink">~@</p>*/}
      <section>
      <p className="command__user"><span className={`userClass`}>$&gt;
      <input
          className={`textField`}
          type="text"
          value={state.term}
          ref={focusCall}
          onChange={e=>dispatch({type:'term', message: e.target.value})}
          autoComplete="off"
          onKeyDown={keyRouter}
          autoFocus="autofocus"/>
      </span></p>
      </section>

    {/*</div>*/}
    </div>
    </div>
  );
}


function reducer(state, action) {
  switch (action.type) {
    case 'term': {
      return {
        session_provider: state.session_provider,
        term: action.message,
        userMessages: state.userMessages,
        userMessagePointer: state.userMessagePointer,
      };
    }

    case 'userMessages':{
        console.log(state, action)
      return{
        session_provider: state.session_provider,
        term: "",
        userMessages: action.message,
        userMessagePointer: action.pointer,
      }
    }

    case 'change_session_provider': {
      return {
        session_provider: action.pobject,
        term: action.message,
        userMessages: state.userMessages,
        userMessagePointer: state.userMessagePointer,
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function closeWindow(){
  console.log('hi')
}

