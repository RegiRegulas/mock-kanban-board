import KanbanBoard from '@/components/KanbanBoard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mini Kanban Board</h1>
      <KanbanBoard />
    </main>
  )
}