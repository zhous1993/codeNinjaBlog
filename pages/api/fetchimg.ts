import { fetchBannerImg } from "@/lib"
import { NextApiRequest, NextApiResponse } from "next"

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
   const img =  await fetchBannerImg()
   console.log(img)
   res.status(200).json({img})
}