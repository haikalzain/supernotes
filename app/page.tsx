import Image from 'next/image'
import {Database} from "@/components/Database/Database";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="">
        <Database />

      </div>

    </main>
  )
}
