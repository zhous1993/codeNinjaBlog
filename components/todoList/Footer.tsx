export default function Footer({
  checkedNum = 0,
  total = 0,
  handleSelectAll,
  handleClear,
}: {
  checkedNum?: number;
  total?: number;
  handleSelectAll: (checked: boolean) => void;
  handleClear: () => void;
}) {
  return (
    <div className="flex justify-between">
      <div>
        <label>
          <input
            type="checkbox"
            checked={checkedNum == total && total > 0}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          全选
        </label>
        <span className="mx-2">
          {checkedNum}/{total}
        </span>
      </div>
      <div>
        <button type="button" onClick={handleClear}>
          清除
        </button>
      </div>
    </div>
  );
}
