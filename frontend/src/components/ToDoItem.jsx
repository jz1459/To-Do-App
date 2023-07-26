import React from "react";

function ToDoItem({ nameOfItem, updateItem, deleteItem}) {
    return (
        <div className="toDoItem">
            <div className="todo-text">
                {nameOfItem}
            </div>
            <div className="buttons">
                <button onClick={updateItem}>Update</button>
                <button onClick={deleteItem}>Delete</button>
            </div>
        </div>
    );
};

export default ToDoItem;