import React, { useEffect, useState } from "react";


function Today() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch("http://localhost:4000/");
        // console.log(data);
        const items = await data.text();
        console.log(items);
        setItems(items);
        console.log("Hi");
    };

    return (
        <div className="item-list">
            {items.map(item => {
                <form action="/delete" method="post">
                    <div className="item">
                        <input type="checkbox" onChange="this.form.submit()" name="checkbox" value={item._id} />
                        <p> {item.name} </p>
                    </div>
                    <input type="hidden" name="listName" value="Today"></input>
                </form>
            })}
            
            <form className="item" action="/" method="post" >
                <input type="text" name="newItem" placeholder="New Item" autocommplete="off" />
                <button type="submit" name="list" value="Today"> + </button>
            </form>
        </div>
    );
};

export default Today;