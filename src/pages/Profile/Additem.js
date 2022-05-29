import React ,{useState} from "react";


const Additem = ({editstate,}) => {
    const [state,setState]=useState({
        title:"",date:""}
        );
    const handleChange=(e)=>{
        setState({...state,[e.target.id]:e.target.value});
        console.log(state);
    }

    const handleSubmit=(e)=>{
        //  e.preventDefault();
        editstate(state);
        // setState([{
        //     name:"",
        //     email:"",
        //     address:"",
        //     specialist:""}]);
    }
    return (
        <div>
                <form>
                <input type="text" placeholder="Enter name" id="title" onChange={handleChange} />
                <input type="date" placeholder="Enter date" id="date" onChange={handleChange} />
                <input type="button" onClick={handleSubmit} value="Add"/>
                </form>
            </div>
    )
}

export default Additem
