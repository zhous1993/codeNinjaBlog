/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-10 14:22:45
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-10 15:25:08
 * @FilePath: \study\codeNinjaBlog\pages\post\context-menu.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MyContextMenu, { MenuItem } from '@/components/contextMenu';
import Layout from '@/components/layout';

export default function ContentMenuView() {
  const menus = [
    { id: 'add', text: '新增' },
    { id: 'edit', text: '编辑' },
    { id: 'delete', text: '删除' },
  ];
  const menus2 = [
    { id: 'add', text: '新增' },
    { id: 'edit', text: '编辑' },
    { id: 'delete', text: '删除' },
    { id: 'preview', text: '查看' },
  ];
  const handleSelect = (menu: MenuItem) => {
    console.log(menu);
  };
  return (
    <Layout>
      <div>
        <MyContextMenu menus={menus} select={handleSelect}>
          <div className="w-full h-[200px] border border-red-900">
            <MyContextMenu menus={menus2} select={handleSelect}>
              <div>children</div>
            </MyContextMenu>
          </div>
        </MyContextMenu>
      </div>
    </Layout>
  );
}
