import React, { useEffect } from 'react'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import { addTodo, resetTodos } from '../store/actions/todosAction'
import { logout } from '../store/actions/userAction'
import { fetchTodos } from '../store/actions/todosAction'

import { useDispatch, useSelector } from 'react-redux'


function Todos(props) {
  const todos = useSelector(state => state.todos)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const addNewTodo = (newTodo) => {
    dispatch(addTodo(newTodo))
  }

  const resetTodo = () => {
    dispatch(resetTodos())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(fetchTodos(user.id))
  }, [dispatch, user.id])

  return (
    <>
      <AddTodo addNewTodo={addNewTodo} />
      <div className="my-5">
        {
          todos.loading
            ? <p>Loading</p>
            : todos.error
              ? <p>something wrong</p>
              : todos.data.length > 0
                ? <TodoList todos={todos.data} />
                : <p>No todos</p>
        }
      </div>
      <div className="flex mt-5">
        <button
          onClick={resetTodo}
          className="border border-gray-500 px-4 py-1 rounded"
        >
          RESET
        </button>
        <button
          onClick={handleLogout}
          className="border border-gray-500 px-4 py-1 ml-3 rounded"
        >
          LOGOUT
        </button>

      </div>
    </>
  )
}

export default Todos
