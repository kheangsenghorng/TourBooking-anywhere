"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentOptions } from "./payment-options";

export function BookingForm() {
  const { id } = useParams();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleConfirm = () => {
    if (!id) {
      router.push("/login"); // Redirects to login if no ID is found
    } else {
      console.log("Proceed with booking, ID:", id);
      // Add logic here to submit booking details
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Your details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name *</Label>
              <Input id="firstName" placeholder="First name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name *</Label>
              <Input id="lastName" placeholder="Last name" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" placeholder="(201) 830-8210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="example@gmail.com" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Information</h3>
        <PaymentOptions id={id} onSelect={setPaymentMethod} />

        {paymentMethod === "card" && (
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Credit Card Number *</Label>
              <Input id="cardNumber" placeholder="1234 1234 1234 1234" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expDate">Expiration Date *</Label>
                <Input id="expDate" placeholder="MM / YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV/CVC *</Label>
                <Input id="cvv" placeholder="CVC" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select defaultValue="cambodia">
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cambodia">Cambodia</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="laos">Laos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" placeholder="90210" />
              </div>
            </div>
          </div>
        )}

        <Button
          className="w-full mt-8 bg-green-600 hover:bg-green-700"
          onClick={handleConfirm}
        >
          Confirm & Proceed
        </Button>
      </div>
    </div>
  );
}
