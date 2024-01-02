import { getUserFromClerkID } from '@/utils/auth'
import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'
import { update } from '@/utils/actions'

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json()
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(entry.content)
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: entry.id,
    },
    create: {
      entryId: entry.id,
      ...analysis,
    },
    update: analysis,
  })

  console.log(savedAnalysis)

  update(['/journal'])

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}
