import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <main>
        <h1 className="text-2xl font-bold mb-8 text-center">My Profile</h1>

        <div className="flex flex-col items-center mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Profile Picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-medium">Mrr Ronaldo</h2>
          <p className="text-gray-600">Ronaldo@gmail.com</p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">First Name</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Last Name</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email Address</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Phone Number</label>
              <Input placeholder="Enter......" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">Bio</label>
            <p className="text-gray-500">No bio yet</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Country</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">City/State</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">ZIP Code</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Street</label>
              <Input placeholder="Enter......" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Home Number</label>
              <Input placeholder="Enter......" />
            </div>
          </div>
        </section>

        <div className="flex justify-center">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-10 py-2 rounded-full">Edit</Button>
        </div>
      </main>
    </div>
  )
}

