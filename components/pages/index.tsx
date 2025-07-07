import SafeDashboard from '../components/SafeDashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Gnosis Vault Dashboard 🔐</h1>
      <SafeDashboard />
    </main>
  )
}
