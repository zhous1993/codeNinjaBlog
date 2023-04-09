import Layout from '@/components/layout';
import Header from '@/components/Header';
import List from '@/components/todoList/List';
import { TodoType } from '@/components/todoList/ListItem';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import Footer from '@/components/todoList/Footer';
export default function ToList() {
  const [todoList, setTodoList] = useState<Array<TodoType>>([
    { id: '01', name: '吃饭', completed: false, checked: false },
    { id: '02', name: '睡觉', completed: false, checked: false },
    { id: '03', name: '打代码', completed: false, checked: false },
  ]);
  const handleAddTodo = (name: string) => {
    if (!name) return;
    name = name.trim();
    if (todoList.findIndex((todo) => todo.name === name) > -1) return;
    const todoItem: TodoType = { id: nanoid(), name, checked: false, completed: false };
    setTodoList([todoItem, ...todoList]);
  };
  const updateTodo = (id: string, checked: boolean) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id == id) {
        todo.checked = checked;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };
  const handleDelete = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id != id);
    setTodoList(newTodoList);
  };
  const handleSelectAll = (checked: boolean) => {
    const newTodList = todoList.map((todo) => {
      todo.checked = checked;
      return todo;
    });
    setTodoList(newTodList);
  };
  const handleClear = () => {
    const newTodoList = todoList.filter((todo) => !todo.checked);
    setTodoList(newTodoList);
  };
  return (
    <Layout>
      <div className="w-[500px] m-auto text-center">
        <Header addTodo={handleAddTodo} />
        <List todoList={todoList} updateTodo={updateTodo} handleDelete={handleDelete} />
        <Footer
          checkedNum={todoList.filter((todo) => todo.checked).length}
          total={todoList.length}
          handleSelectAll={handleSelectAll}
          handleClear={handleClear}
        />
      </div>
    </Layout>
  );
}
