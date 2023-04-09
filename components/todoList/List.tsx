import ListItem, { TodoType } from './ListItem';

export default function List({
  todoList,
  updateTodo,
  handleDelete,
}: {
  todoList: Array<TodoType>;
  updateTodo: (id: string, checked: boolean) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <div className="py-4">
      {todoList.map((todo) => (
        <ListItem detail={todo} key={todo.id} change={updateTodo} handleDelete={handleDelete} />
      ))}
    </div>
  );
}
