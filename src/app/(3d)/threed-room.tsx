'use client'

import { Prisma, PrismaClient } from "@prisma/client";

export default function ThreedRoom({
  data
}:{
  data: Prisma.ShelfGetPayload<{
    include:{
      stuff:true
    }
  }>[]
}) {
  return (
    <>
      
    </>
  );
}