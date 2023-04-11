/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-11 14:45:51
 * @LastEditors: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @LastEditTime: 2023-04-11 17:20:35
 * @FilePath: \study\codeNinjaBlog\components\MusicPlayer\Login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { checkQR, createQR, fetchQRKey, fm } from '@/api/music';
import { useEffect, useState } from 'react';
export default function MusicPlayerLogin() {
  let key: string;
  let timer: any;
  const [qrimg, setQrimg] = useState<string>('');
  const [isLogged, setIsLogged] = useState(false);
  const [status, setStatus] = useState('等待扫码');
  const initQRCode = async () => {
    const res = await fetchQRKey();
    key = res.data.unikey;
    const { data } = await createQR(key);
    console.log('刷新图片');
    setQrimg(data.qrimg);
    checkQRCode();
  };
  const checkQRCode = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      const res: any = await checkQR(key);
      setStatus(res.message);
      if (res.code === 803) {
        console.log('登录成功');
        localStorage.setItem('cookie', res.cookie);
        setIsLogged(true);
      } else if (res.code === 800) {
        console.log('二维码过期');
        initQRCode();
      } else {
        return checkQRCode();
      }
    }, 5000);
  };

  useEffect(() => {
    if (!localStorage.getItem('cookie')) {
      initQRCode();
    } else {
      setIsLogged(true);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="text-white">
      {isLogged ? (
        <div></div>
      ) : (
        <>
          <img width={100} height={100} src={qrimg} alt="" />
          <div>{status}</div>
        </>
      )}
    </div>
  );
}
