import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsFillArchiveFill, BsCheckCircleFill } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef,useEffect } from "react";
import axios from 'axios';
import IncompleteTask from './IncompleteTask'
import CompletedTask from "./CompletedTask";
function App() {
  const token = localStorage.getItem('token');
  const apiURL= "http://127.0.0.1:8000/api/";
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};

  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);

  useEffect(async () => {
      const resp = await axios.get("http://127.0.0.1:8000/api/get-all",config);
      console.log(resp.data);
      const completed_tasks = resp.data.filter(item=>item.status === 1);
      const incompleted_tasks = resp.data.filter(item=>item.status === 0);
      console.log(completed_tasks,incompleted_tasks);
      setCompletedTasks(completed_tasks);
      setIncompletedTasks(incompleted_tasks);
  }, []);



  const currentTask = useRef(null);
  const [error, setError] = useState(false);

  const deleteTask = async (todoId) =>{
      await axios.delete("http://127.0.0.1:8000/api/todo",{todoId},config);
      // how to remove from frontend.
      // 1. use useEffect

  };

  const deleteCompletedTask = async (task) => {
  
    await axios.post("http://127.0.0.1:8000/api/del-todo",{todoId:task.id},config);
    const newTasks = completedTasks.filter((todo) => todo.id !== task.id);
    setCompletedTasks(newTasks);
    
  };

  const deleteIncompletedTask = async (task) => {
    console.log(config);
    await axios.post("http://127.0.0.1:8000/api/del-todo",{todoId:task.id},config);
    const newTasks = incompletedTasks.filter((todo) => todo.id !== task.id);
    setIncompletedTasks(newTasks);
  };

  const markCompleted = async (todo) => {
    await axios.patch("http://127.0.0.1:8000/api/todo",{todoId:todo.id,status:'1'},config);
    const newArr = [todo, ...completedTasks];
    const newIncompletedTasks = incompletedTasks.filter(task => task.id !==todo.id);
    setIncompletedTasks(newIncompletedTasks);
    setCompletedTasks(newArr);
  };

  const addTask = async () => {
    const currTask = currentTask.current.value;
    if (incompletedTasks.indexOf(currTask) === -1 && currTask.length) {
      try {
        const newTodo = await axios.post("http://127.0.0.1:8000/api/todo",{todoBody:currTask},config);
        const newArr = [newTodo.data[0], ...incompletedTasks];
        setIncompletedTasks(newArr);
        currentTask.current.value = "";
        localStorage.setItem("incompletedTasks", JSON.stringify(newArr));
      } catch (error) {
        console.warn(error);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
      } else {
        setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };


  return (
    <>
      <div className="container0">
        {error && (
          <>
            <div className="error">Task already Exists</div>
          </>
        )}
        <input
          type="text"
          className="task-input"
          ref={currentTask}
          placeholder="Enter task"
        />
        <BsFillArrowDownCircleFill
          size={42}
          className="save-icon"
          onClick={() => {
            addTask();
          }}
        />
      </div>

      <main className="app">
        <IncompleteTask
          className="container2"
          incompletedTasks={incompletedTasks}
          deleteIncompletedTask={deleteIncompletedTask}
          markCompleted={markCompleted}
        />
        <CompletedTask
          className="container1"
          completedTasks={completedTasks}
          deleteCompletedTask={deleteCompletedTask}
        />
      </main>
    </>
  );
}




export default App;
