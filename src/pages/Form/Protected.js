
import React,{useEffect} from 'react';
import {useHistory} from "react-router-dom"

const Protected = (props) => {
    const history =useHistory();
  useEffect(()=>{
    if(!localStorage.getItem("user-info")){
      history.push("/");
    }
  })
    let Cmp=props.Cmp
    return (
        <div>
            <Cmp/>
        </div>
    )
}

export default Protected
