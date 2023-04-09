/*
 * @Author: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @Date: 2023-04-08 14:49:00
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-08 15:35:44
 * @FilePath: \Study\ninja-blog\components\Header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { KeyboardEventHandler, useState } from 'react';

export default function Header({ addTodo }: { addTodo: (name: string) => void }) {
  const [inputValue, setInputValue] = useState<string>('');
  const handleInputChange = (e: Event | any) => {
    setInputValue(e.target.value);
  };
  const handleKeyUp = (e: any) => {
    if (e.keyCode == 13) {
      addTodo(inputValue);
      setInputValue('');
    }
  };
  return (
    <input
      className="w-full w-[500px] outline-transparent p-2"
      type="text"
      value={inputValue}
      onKeyUp={handleKeyUp}
      onChange={handleInputChange}
      placeholder="输入你的任务名称，按回车键确认"
    />
  );
}
