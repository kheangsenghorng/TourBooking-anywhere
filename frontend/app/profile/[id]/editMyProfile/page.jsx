import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <main>
        <h1 className="text-2xl font-bold mb-8 ">My Profile</h1>

        <div className="flex items-center mb-8">
        <div className="flex">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <main className="flex flex-col items-cente justify-center ml-4">
            <h2 className="mt-4 text-xl font-semibold">Mrr Ronaldo</h2>
            <p className="text-gray-600">Ronaldo@gmail.com</p>
          </main>
        </div>
      </div>
      {/* <div className="flex justify-end mb-4">
        <Link href={`/profile/${id}/editMyProfile`}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 py-2 flex items-center gap-2 transition-colors">
          Edit Profile
          <PenSquare className="w-5 h-5" />
        </button>
        </Link>
      </div> */}
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

