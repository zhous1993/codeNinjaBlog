/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-11 14:16:54
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-05-08 16:10:12
 * @FilePath: \study\codeNinjaBlog\api\music.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/util/axios';
export enum SongLevel {
  standard = 'standard',
  higher = 'higher',
  exhigh = 'exhigh',
  lossless = 'lossless',
  hires = 'hires',
}
/**
 * 生成key
 */
export const fetchQRKey = () => {
  return request({
    method: 'get',
    url: '/music/login/qr/key',
  });
};
/**
 * 获取二维码
 * @param key
 * @returns
 */
export const createQR = (key: string) =>
  request({
    method: 'get',
    url: '/music/login/qr/create',
    params: { key, qrimg: true },
  });

/**
 * 检查二维码登录状态
 * @param key
 * @returns
 */
export const checkQR = (key: string) =>
  request({
    url: '/music/login/qr/check',
    params: { key },
  });

/**
 * 个人fm
 */
export const fm = () => {
  return request({
    url: '/music/personal_fm',
    method: 'get',
  });
};

/**
 * 获取音频播放链接
 * @param id 歌曲id
 * @param level 音质等级
 * @returns
 */
export const fetchSongUrlById = (id: string, level: SongLevel = SongLevel.higher) => {
  return request({
    url: '/music/song/url/v1',
    params: { id, level },
  });
};

/**
 * 获取歌词
 * @param id 歌曲id
 * @returns
 */
export const fetchLRCById = (id: string) =>
  request({
    url: '/music/lyric',
    params: { id },
  });
