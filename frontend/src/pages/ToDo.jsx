import React, { useEffect, useState } from "react";
import axios from 'axios';
import ToDoItem from "../components/ToDoItem";
import { Container, Row, Col } from "react-bootstrap";
import { Wheel } from 'react-custom-roulette'

function ToDo() {
    const url = "http://localhost:4000/todo";
    const [items, setItems] = useState([]);
    const [toDoName, setToDoName] = useState("");
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdating] = useState(false);


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
        setItems(res.data);
    };
    
    const updateTodo = async (_id, toDoName) => {
        const res = await axios.put("http://localhost:4000/", { _id, toDoName });
        console.log(_id);
        setToDoName("")
        setIsUpdating(false)
        setItems(res.data);
    };

    
    const deletingToDo = async (_id) => {
        console.log(_id);
        const res = await axios.delete("http://localhost:4000/", { data: { _id } });
        setItems(res.data);
    };


    const updating = (_id, newName) => {
        setIsUpdating(true);
        setToDoName(newName);
        setId(_id);
    };

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const [rouletteData, setRouletteData] = useState([]);
    useEffect(() => {
        const pieChartData = items.map(item => {
            return {
                option: item.name
            }
        });
        setRouletteData(pieChartData);
    }, [items]);

    return (
        <section className="item-list" id="item-list">
            <Container>
                <Row>
                    <div className="heading">
                        <h1>To-Do List</h1>
                    </div>
                </Row>
                <div className="addItem">
                    <Row>
                        <Col size={8}>
                            <div className="addText">
                                <input type="text" placeholder="Add Item" value={toDoName} onChange={(event) => setToDoName(event.target.value)} />
                            </div>
                        </Col>
                        <Col size={4}>
                            <div className="addButton">
                                <a onClick={isUpdate ? () => updateTodo(id, toDoName)
                                    : () => createItem(toDoName)}><i className={isUpdate ? "bi bi-check" : "bi bi-plus-circle"}></i> </a>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="list">
                    {
                        items.map((item) =>
                            <Row key={item._id}>
                                <ToDoItem
                                    nameOfItem={item.name}
                                    updateItem={() => updating(item._id, item.name)}
                                    deleteItem={() => deletingToDo(item._id)}
                                />
                            </Row>
                        )
                    }
                </div>
                <div className="spinner">
                    {console.log(rouletteData)}
                    {rouletteData.length != 0 ?  <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={rouletteData}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    /> : <h1>Add an Item for Spinner</h1>}
                    <button onClick={handleSpinClick}>SPIN</button>
                </div>
            </Container>
        </section>
    );
};

export default ToDo;