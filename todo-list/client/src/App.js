// import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const TodoItem = ({item, handleClick}) => {
  // console.log(`TodoItem: ${item.task}`);
  return (
    <div>
      <p onClick={() => handleClick(item.id)}>
        {item.task}, {item.done ? '✔️' : '🟢'}
      </p>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // get todos from back-end
  useEffect(() => {
    axios.get('/todos')
      .then(({ data }) => {
        setItems(data);
      })
  }, []); // just on the first render

  function handleChange(event) {
    // console.log(event.target.value); // 123
    setInput(event.target.value);
    // console.log(input) // 12
  }

  const handleClick = id => {
    axios.post(`/todos/${id}/checkoff`).then(res => {
      const results = items.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      });
      setItems(results);
      console.log(`checked off ${id} successfully`);
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      task: input,
      done: false
    }

    axios
      .post('/todos/', { todo: newTodo })
      .then(({data}) => { // data === newTodo
        console.log(data);
        setItems([...items, data]);
      })
  }

  return (
    <div className="App">
      <h1>Todos List</h1>
      {items.map((item) => {
        return <TodoItem key={item.id} item={item} handleClick={handleClick} />;
      })}

      <form onSubmit={handleSubmit}>
        <label>Add todo item</label>
        <input type='text' onChange={handleChange} value={input}></input>
        <button>Add</button>
      </form>
    </div>
  );
}

export default App;
