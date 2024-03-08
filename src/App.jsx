import './App.css';
import shopping from "./assets/shopping.png";
import {useState, useEffect} from "react";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [groceryItems, setGroceryItems] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    
    useEffect(() => {
        determinCompletedStatus();
    }, [groceryItems]) ;

    const handleChangeInputValue = (e) => {
        setInputValue(e.target.value);
    };

    const determinCompletedStatus = () => {
        if (!groceryItems.length) {
            return setIsCompleted(false);
        }

        let isAllCompleted = true;
        groceryItems.forEach((item) => {
            if (!item.completed) isAllCompleted = false;
        });

        setIsCompleted(isAllCompleted);
    };

    const handleAddGroceryItem = (e) => {
        if (e.key == "Enter" && inputValue) {
            const updatedGroceryList = [...groceryItems];
            const itemIndex = updatedGroceryList.findIndex(item => item.name === inputValue);
            if (itemIndex === -1) {
                updatedGroceryList.push ({
                    name: inputValue,
                    quantity: 1, 
                    completed: false
                });
            } else {
                updatedGroceryList[itemIndex].quantity++;
            }
            setGroceryItems(updatedGroceryList);
            setInputValue("");
        }
    };

    const handleRemoveItem = (name) => {
        const updatedGroceryList = [...groceryItems].filter(item => item.name != name);
        setGroceryItems(updatedGroceryList);
    };

    const handleUpdateCompleteStatus = (status, index) => {
        const updatedGroceryList = [...groceryItems];
        updatedGroceryList[index].completed = status;
        setGroceryItems(updatedGroceryList);
        determinCompletedStatus();
    }

    const renderGroceryList = () => {
        return groceryItems.map((item, index) => (      
            <li key={item.name}>
                <div className="container">
                    <input 
                        type="checkbox" onChange={(e) => {
                            handleUpdateCompleteStatus(e.target.checked, index);
                        }}
                        value={item.completed}
                        checked={item.completed}
                    />
                    <p>
                        {item.name}
                        {item.quantity > 1 ? <span>x{item.quantity}</span> : null}
                    </p>
                </div>
                <div>
                    <button className="remove-button" onClick={() => handleRemoveItem(item.name)}>X</button>
                </div>
            </li>
        ));
    };

    return (
        <main className="App">
            <div>
                <div>
                    {isCompleted && <h4 className="success">You're Done</h4>}
                    <div className="header">
                        <h1>Shopping List</h1>
                        <img src={shopping} alt="" />
                        <input 
                        type="text" 
                        placeholder="Add an Item"
                        className="item-input"
                        onChange={handleChangeInputValue}
                        value={inputValue}
                        onKeyDown={handleAddGroceryItem}/>
                    </div>
                </div>
                <ul>
                    {renderGroceryList()}
                </ul>
            </div>
        </main>
    );
}

export default App
