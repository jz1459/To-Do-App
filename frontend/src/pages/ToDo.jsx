import React, { useEffect, useState } from "react";
import axios from 'axios';
import ToDoItem from "../components/ToDoItem";


function ToDo() {
    const url = "http://localhost:4000/todo";
    const [items, setItems] = useState([]);
    const [toDoName, setToDoName] = useState("");
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdating] = useState(false);


    // useEffect(() => {
    //     fetchItems();
    // }, []);

    // const fetchItems = async () => {
    //     const data = await fetch("http://localhost:4000/");
    //     const items = await data.json();
    //     setItems(items);
    // };
    // useEffect(() => {
    //     fetch("http://localhost:4000/", {
    //         method: "GET",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data, "itemsData");
    //             setItems(data.data);
    //         });
    // }, []);
    
    // const getItems = () => {
    //     axios.get(url).then(
    //         ({ data }) => {
    //             setItems(data);
    //         }
    //     );
    // };
    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const res = await axios.get("http://localhost:4000/");
        setItems(res.data);
    };
    
    const createItem = async (itemName) => {
        const res = await axios.post("http://localhost:4000/", { itemName });
        setToDoName("");
        // setItems(res.data);//redirect
        getItems();
    };
    
    const updateTodo = async (_id, toDoName) => {
        const res = await axios.put("http://localhost:4000/", { _id, toDoName });
        setToDoName("")
        setIsUpdating(false)
        // setItems(res.data); //redirect
        getItems();
    };

    const deletingToDo = async (_id) => {
        const res = await axios.delete("http://localhost:4000/", { _id });
        // setItems(res.data); //redirect
        getItems();
    };


    const updating = (_id, newName) => {
        setIsUpdating(true);
        setToDoName(newName);
        setId(_id);
    };

    return (
        <section className="todoList" id="todoList">
            <div className="input">
                <input type="text" placeholder="Add Item" value={toDoName} onChange={(event) => setToDoName(event.target.value)} />
            </div>
            <div className="addButton">
                <button onClick={isUpdate ? () => updateTodo(id, toDoName)
                    : () => createItem(toDoName)}> {isUpdate ? "Update Item" : "Add Item"} </button>
            </div>
            <div className="list">
                {
                    items.map((item) => <ToDoItem
                        key={item._id}
                        nameOfItem={item.name}
                        updateItem={() => updating(item._id, item.name)}
                        deleteItem={() => deletingToDo(item._id, setItems)} />)
                }
            </div>
        </section>
    );
};

export default ToDo;







// <div className="item-list">
        //     {items.map(item => {
        //         // return (
        //             <form action="/delete" method="post">
        //                 <div className="item">
        //                     <input type="checkbox" onChange={() => this.handleClick({ item._id })} name="checkbox" value={item._id} />
        //                     <p> {item.name} </p>
        //                 </div>
        //                 <input type="hidden" name="listName" value="Today"></input>
        //             </form>
        //         // );
        //     })}
            
        //     <form className="item" action="/" method="post" >
        //         <input type="text" name="newItem" placeholder="New Item" autocomplete="off" />
        //         <button type="submit" name="list" value="Today"> + </button>
        //     </form>
        // </div>