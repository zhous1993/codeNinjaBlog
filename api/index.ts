import request from "@/util/axios"

/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-05-08 16:15:15
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-10 14:28:00
 * @FilePath: \study\codeNinjaBlog\api\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const key = '35364662-0dd331677e6a0c0173ea69131'
export const fetchBannerImg = () => {
    const page = Math.round(Math.random() * 20);
    return request({
        url: `/api/cover/?orientation=horizontal&page=${page}&key=${key}`,
        method: 'get'
    });

};

export const queryImage = (page: number) => {
    return request({
        url: `/api/cover/?orientation=horizontal&page=${page}&key=${key}`,
        method: 'get'
    })
}