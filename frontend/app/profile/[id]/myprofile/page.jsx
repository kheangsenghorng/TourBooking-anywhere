"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react";

const page = () => {
  const {id} = useParams();

  return (
    <div>
      Page My Profile {id}
    </div>
  )
}

export default page
