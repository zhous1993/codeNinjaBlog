export type TodoType = {
  id: string;
  name: string;
  checked: boolean;
  completed: boolean;
};

export default function ListItem({
  detail,
  change,
  handleDelete,
}: {
  detail: TodoType;
  change: (id: string, checked: boolean) => void;
  handleDelete: (id: string) => void;
}) {
  const handleSelectChange = (e: any) => {
    change(detail.id, e.target.checked);
  };

  return (
    <div className="flex justify-between my-1">
      <label>
        <input type="checkbox" checked={detail.checked} onChange={handleSelectChange} />

        {detail.name}
      </label>
      <button
        type="button"
        onClick={() => {
          handleDelete(detail.id);
        }}
      >
        删除
      </button>
    </div>
  );
}
