import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function BookingSummary() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4">
          <Image
            src="/image/1.jpg"
            alt="Phnom Penh Tour"
            width={350}
            height={200}
            className="rounded-md w-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold mb-4">Phnom Penh Tour</h3>

        <div className="space-y-2 mb-4">
          <div className="text-sm">02 Adults, 01 Kids</div>
          <div className="text-sm">1 Bed Room, 3 Beds Room</div>
          <div className="text-sm">Date Feb 20 - 25</div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span>Guest x 3</span>
            <span className="font-medium">$56.00</span>
          </div>
          <div className="flex justify-between">
            <span>3 Bed Room</span>
            <span className="font-medium">$45.00</span>
          </div>
          <div className="flex justify-between">
            <span>1 Bed Room</span>
            <span className="font-medium">$0.00</span>
          </div>
        </div>

        <div className="flex justify-between border-t mt-4 pt-4">
          <span className="font-bold">Total</span>
          <span className="font-bold">$101.00</span>
        </div>
      </CardContent>
    </Card>
  )
}

