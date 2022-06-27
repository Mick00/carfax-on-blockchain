// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { isGeneratorFunction } from 'util/types'
import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient();

type Response = {
  name: string
}

type Contributer = {
  companyName: string,
  sectorOfActivity: string,
  address: string,
  email: string,
  website: string,
  phone: string,
  walletAddress: string,
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === 'GET') {
    res.status(200).json({ name: 'testing get request' })
  }
  else if (req.method === 'POST') {
    const subscription = req.body;
    console.log(subscription);
    prisma.contributor.create({
      data: {
        CompanyName: subscription.companyName,
        SectorOfActivity: subscription.sectorOfActivity,
        Address: subscription.address,
        DateOfRegistration: subscription.dateOfRegistration,
        CodePostal : subscription.codePostal,
        City: subscription.city,
        Email: subscription.email,
        Website: subscription.website,
        PhoneNumber: subscription.phoneNumber,
        WalletAddress: subscription.walletAddress,
      }
    }).then(contributor => { console.log("inserted this contributor" + contributor) });
  }
  res.status(200).json({ name: 'world' })
}

// function insertValue(contributor: object) {
//   prisma.contributor.create({
//     data: {
//       companyName: contributor.companyName,
//       sectorOfActivity: contributor.sectorOfActivity,
//       address: contributor.address,
//     }
//   }).then(contributor => { console.log("inserted this contributor" + contributor) });
// }