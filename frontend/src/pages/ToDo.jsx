import React, { useEffect, useState } from "react";
import axios from 'axios';
import ToDoItem from "../components/ToDoItem";
import { Container, Row, Col} from "react-bootstrap";
import { Wheel } from 'react-custom-roulette';
import MyModal from "../components/SpinnerMessage";

function ToDo() {
    const url = "http://localhost:4000/";
    const [items, setItems] = useState([]);
    const [toDoName, setToDoName] = useState("");
    const [id, setId] = useState("");
    const [isUpdate, setIsUpdating] = useState(false);

    //Routing and grabbing/setting the data from MongoDB
    useEffect(() => {
        getItems();
    }, []);

    const getItems = async () => {
        const res = await axios.get(url);
        setItems(res.data);
    };
    
    const createItem = async (itemName) => {
        const res = await axios.post(url, { itemName });
        setToDoName("");
        setItems(res.data);
    };
    
    const updateTodo = async (_id, toDoName) => {
        const res = await axios.put(url, { _id, toDoName });
        console.log(_id);
        setToDoName("")
        setIsUpdating(false)
        setItems(res.data);
    };

    const deletingToDo = async (_id) => {
        console.log(_id);
        const res = await axios.delete(url, { data: { _id } });
        setItems(res.data);
    };

    const updating = (_id, newName) => {
        setIsUpdating(true);
        setToDoName(newName);
        setId(_id);
    };

    // End of Routing and setting data via MongoDB

    // Spinner Wheel Logic
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

    // End of Spinner Wheel Logic

    // Winning Task Popup Logic
    const [modalData, setModalData] = useState(null);
    const showModal = (project) => setModalData(project);
    const hideModal = () => setModalData(null);

    // Grabbing the Current Date
    const getDate = () => {
        const today = new Date();
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long"
        };
        return today.toLocaleDateString("en-US", options);
    };
    const [currentDate, setCurrentDate] = useState(getDate());

    return (
        <section className="item-list" id="item-list">
            <Container>
                <Row>
                    <div className="heading">
                        <h1>{currentDate}</h1>
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
                {console.log(rouletteData)}
                {rouletteData.length !== 0 ?
                    <div className="spinner">
                        <Row>
                            <Col>
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    spinDuration={[0.5]}
                                    prizeNumber={prizeNumber}
                                    outerBorderColor={["#ccc"]}
                                    outerBorderWidth={[9]}
                                    innerBorderColor={["#f2f2f2"]}
                                    radiusLineColor={["tranparent"]}
                                    radiusLineWidth={[1]}
                                    textColors={["#f5f5f5"]}
                                    textDistance={55}
                                    fontSize={[15]}
                                    backgroundColors={[
                                        "#3f297e",
                                        "#175fa9",
                                        "#169ed8",
                                        "#239b63",
                                        "#64b031",
                                        "#efe61f",
                                        "#f7a416",
                                        "#e6471d",
                                        "#dc0936",
                                        "#e5177b",
                                        "#be1180",
                                        "#871f7f"
                                    ]}
                                    data={rouletteData}
                                    onStopSpinning={() => {
                                        setMustSpin(false);
                                        showModal(rouletteData[prizeNumber].option)
                                    }}
                                />
                                <div className="spinnerMessage">
                                    {modalData && (<MyModal show={modalData} message={modalData} onClose={hideModal} />)}
                                </div>
                            </Col>
                            <Col>
                                <button onClick={handleSpinClick} disabled={mustSpin}> What task should I do next?</button>
                            </Col>
                        </Row>
                    </div>
                    : <div className="emptyMessage"><h1>Add an Item for To-Do Spinner</h1></div>}
            </Container>
        </section>
    );
};

export default ToDo;