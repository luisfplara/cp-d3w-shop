import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log('reqreqreqreq');
    console.log(req);
  const data = req.body

  res.status(200).json({ teste: 'testado' })
}