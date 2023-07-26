import React from "react";
import { Col } from "react-bootstrap";
function ToDoItem({ nameOfItem, updateItem, deleteItem}) {
    return (
        <div className="item">
            <Col size={8}>
                <div className="todo-text">
                    <p>{nameOfItem}</p>
                </div>
            </Col>
            <Col size={4}>
                <div className="buttons">
                    <a onClick={updateItem}><i className="bi bi-pencil"></i></a>
                    <a onClick={deleteItem}><i className="bi bi-check-circle"></i></a>
                </div>
            </Col>
        </div>
    );
};

export default ToDoItem;