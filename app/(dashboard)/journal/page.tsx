// import Question from '@/components/Question'
// import { qa } from '@/util/ai'
import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { analyze } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserFromClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="px-6 py-8 bg-zinc-300/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      {/* <div className="my-8">
        <Question />
      </div> */}
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`}>
            <EntryCard key={entry.id} entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
