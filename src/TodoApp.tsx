import { useState } from 'react';
import * as React from "react";
import './TodoApp.css';
import useDebounce from './hooks/useDebounce.ts';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const TodoApp = () => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: Date.now() + 1, text: "Тестовое задание", completed: false },
        { id: Date.now() + 2, text: "Прекрасный код", completed: true },
        { id: Date.now() + 3, text: "Покрытие тестами", completed: false },
    ]);
    const [inputValue, setInputValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('all');
    const debouncedValue = useDebounce(inputValue, 0);
    const [isListVisible, setIsListVisible] = useState<boolean>(true);

    const addTodo = (text: string):void => {
        if (text.trim()) {
            const newTodo = { id: Date.now(), text, completed: false };
            setTodos((prevTodos:Todo[]) => {
                return [...prevTodos, newTodo];
            });
            setInputValue('');
        }
    };

    const toggleTodo = (id: number):void => {
        setTodos((prevTodos:Todo[]) => {
            return prevTodos.map((todo:Todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === 'Enter') {
            addTodo(String(debouncedValue));
        }
    };

    const clearCompleted = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    };

    const filteredTodos:Todo[] = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const toggleListVisibility = ():void => {
        setIsListVisible(prev => !prev);
    };


    return (
        <main
            className="todo-app"
            >
            <h1
                id="headerName"
            >todos</h1>
            <article
                className="list-to-do__wrapper"
                >
                <div
                    className="input-container"
                    >
                    <button
                        onClick={toggleListVisibility}
                        className="toggle-button"
                        title="toggleButton"
                    >
                        {isListVisible ? '↑' : '↓'}
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What needs to be done?"
                        id="inputTask"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {isListVisible && (
                    <ul
                        id="listToDo"
                        title="listToDoTitle"
                        >
                        {filteredTodos.map(todo => (
                            <li
                                key={todo.id}
                                id="itemListToDo"
                                >
                                <button
                                    className={`status-button ${todo.completed ? 'completed' : ''}`}
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    {todo.completed && <span className="checkmark">&#10003;</span>}
                                </button>
                                <span
                                    className={todo.completed ? 'completed-text' : ''}
                                      onClick={() => toggleTodo(todo.id)}>
                                {todo.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
                <div
                    className="filter-buttons__wrapper">
                    <span>{filteredTodos.length} items left</span>
                    <div
                        className="filter-buttons">
                        <button
                            onClick={() => setFilter('all')}
                            id="allFilterButton"
                        >
                            All</button>
                        <button
                            onClick={() => setFilter('active')}
                            id="activeFilterButton"
                        >
                            Active</button>
                        <button
                            onClick={() => setFilter('completed')}
                            id="completedFilterButton"
                        >
                            Completed</button>
                        <button
                            onClick={clearCompleted}
                            id="clearButton"
                        >
                            Clear completed</button>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default TodoApp;