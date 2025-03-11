import { FaUserSecret } from "react-icons/fa6";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import TourDetailsGuest from "@/components/TourDetailsGuest";
import TourDetailsIteneray from "@/components/TourDetailsIteneray";
import TourDetailsDetail from "@/components/TourDetailsDetail";

const page = () => {
  return (
    <div className="h-screen space-y-5 bg-[#F5F6FA]">
    <div className="sticky top-0 z-10">
        <div className="flex p-10 items-center h-16 justify-between bg-white">
            <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-semibold">Tour Details</h1>
                    <BiEditAlt className="text-xl cursor-pointer"/>
            </div>

            <div className="flex items-center space-x-6">
                <FaBell className="h-7 w-7" />
                <div className="flex space-x-5 items-center">
                    <FaUserSecret className="h-8 w-8" />
                    <div className="text-sm">
                        <h1>Gus Fring</h1>
                        <h1>Admin</h1>
                    </div>
                    <IoIosArrowDropdown className="text-[#5C5C5C] h-4 w-4 cursor-pointer" />
                </div>
            </div>
        </div>

    </div>

    <div className="flex mx-10 space-x-6">
        <div className="bg-white border-2 p-6 rounded-lg w-fit space-y-6 h-fit">
            <div className="flex justify-between">
                <div className="space-x-16 flex">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">Tour Name:</h1>
                            <h1 className="text-[#495560] font-semibold">u</h1>
                        </div>
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">Stated Date:</h1>
                            <h1 className="text-[#495560] font-semibold">i</h1>
                        </div>
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">Maximum Participants:</h1>
                            <h1 className="text-[#495560] font-semibold">u</h1>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">Created At:</h1>
                            <h1 className="text-[#495560] font-semibold">k</h1>
                        </div>
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">End Date:</h1>
                            <h1 className="text-[#495560] font-semibold">i</h1>
                        </div>
                        <div>
                            <h1 className="text-[#7E92A2] text-sm font-medium">Price:</h1>
                            <h1 className="text-[#495560] font-semibold">o</h1>
                        </div>
                    </div>
                </div>
                <img className="w-auto h-48 rounded-xl" />
                    
            </div>
            <div className="w-[672.150px]">
                <h1 className="text-[#7E92A2] text-sm font-medium">Overview:</h1>
                <h1 className="text-[#495560] font-semibold text-wrap">u</h1>
            </div>
        </div>

        <TourDetailsGuest    />
    </div>

    <div className="flex mx-10 space-x-6 pb-5">
        {/* past id  <TourDetailsIteneray id={id} />   */}
        <TourDetailsIteneray  />  

        <TourDetailsDetail  />
    </div>
</div>
  )
}

export default page
