/*
 * @Author: DESKTOP-ER2OAAD\zs_lq zhous@ai-cloud.edu
 * @Date: 2023-04-11 14:45:51
 * @LastEditors: DESKTOP-16EDV1I\zs_lq zhous0310@gmail.com
 * @LastEditTime: 2023-04-12 22:17:16
 * @FilePath: \study\codeNinjaBlog\components\MusicPlayer\Login.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { checkQR, createQR, fetchQRKey, fm } from '@/api/music';
import { useEffect, useRef, useState } from 'react';
export default function MusicPlayerLogin({ login }: { login: (e: boolean) => void }) {
  let key = useRef<string>('');
  let timer = useRef<any>(null);
  const [qrimg, setQrimg] = useState<string>('');
  const [isLogged, setIsLogged] = useState(false);
  const [status, setStatus] = useState('等待扫码');
  const initQRCode = async () => {
    const res = await fetchQRKey();
    key.current = res.data.unikey;
    const { data } = await createQR(key.current);
    console.log('刷新图片');
    setQrimg(data.qrimg);
    checkQRCode();
  };
  const checkQRCode = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      const res: any = await checkQR(key.current);
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
      clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    login(isLogged);
  }, [isLogged]);
  return (
    <div className="text-white flex justify-center flex-col items-center py-4">
      {isLogged ? (
        <div></div>
      ) : (
        <>
          <img width={100} height={100} src={qrimg} alt="" />
          <div className="my-4">{status}</div>
        </>
      )}
    </div>
  );
}
