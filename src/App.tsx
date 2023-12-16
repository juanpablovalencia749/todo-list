import { useState } from 'react'
import Todos from './components/Todos'
import { type TodoTitle, type FilterValue, type TodoId, type Todo as TodoType, type Todo } from './types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Hearder'

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Buy groceries',
    completed: true
  },
  {
    id: '2',
    title: 'Complete homework assignment',
    completed: false
  },
  {
    id: '3',
    title: 'Make a coffee',
    completed: false
  },
  {
    id: '4',
    title: 'Exercise for 30 minutes',
    completed: true
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodo = todos.filter(todo => todo.id !== id)
    setTodos(newTodo)
  }

  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
  ): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({ title }: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (

    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo}/>
      <Todos
      onToggleCompleteTodo= {handleCompleted}
      todos = {filteredTodos}
      onRemoveTodo= {handleRemove}
      />
      <Footer
        completedCount={ completedCount }
        activeCount={activeCount }
        onClearCompleted={handleRemoveAllCompleted}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
