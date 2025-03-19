"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CreditCard, MapPin, User } from "lucide-react";
import { useParams } from "next/navigation";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function ProfilePage() {
  const params = useParams(); //// Correctly calling useParams inside the component
  const { user, loading, error, fetchUserById } = userStore();

  useEffect(() => {
    if (params.userId) {
      fetchUserById(params.userId);
    }
  }, [params.userId, fetchUserById]);
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Sidebar with user info */}
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.profile_image} alt="User profile" />
                  <AvatarFallback className="h-24 w-24 bg-red-300 text-gray-500 uppercase">
                    {" "}
                    {user?.firstname?.charAt(0)}
                    {user?.lastname?.charAt(0)}
                    {""}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold">{user?.lastname}</h2>
                  <p className="text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-4 w-4" />
                    New York, USA
                  </p>
                </div>
                <div className="flex w-full justify-around text-center">
                  <div>
                    <p className="text-xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Tours</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">4</p>
                    <p className="text-xs text-muted-foreground">Countries</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Years</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <CalendarDays className="h-4 w-4 mr-2" />
                Booking History
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment History
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p className="text-base">
                          {user?.firstname} {user?.lastname}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email
                        </h3>
                        <p className="text-base text-wrap">{user?.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone
                        </h3>
                        <p className="text-base">
                          {user?.phonenumber || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </h3>
                        <p className="text-base">January 15, 1985</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Address
                        </h3>
                        <p className="text-base">
                          123 Travel Street, New York, NY 10001
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Passport Number
                        </h3>
                        <p className="text-base">P12345678</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Travel Preferences
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Adventure</Badge>
                        <Badge variant="outline">Cultural</Badge>
                        <Badge variant="outline">Beach</Badge>
                        <Badge variant="outline">Food & Wine</Badge>
                        <Badge variant="outline">Luxury</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Booking History Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>
                    View all your past and upcoming tour bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Upcoming Tour */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Bali Paradise Exploration
                          </h3>
                          <p className="text-muted-foreground">
                            Booking ID: BK-2023-8754
                          </p>
                        </div>
                        <Badge className="bg-blue-500">Upcoming</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Dates
                          </h4>
                          <p>Jun 15, 2024 - Jun 25, 2024</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Guests
                          </h4>
                          <p>2 Adults</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Total
                          </h4>
                          <p>$2,450</p>
                        </div>
                      </div>
                    </div>

                    {/* Completed Tour */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            European Heritage Tour
                          </h3>
                          <p className="text-muted-foreground">
                            Booking ID: BK-2023-6542
                          </p>
                        </div>
                        <Badge className="bg-green-500">Completed</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Dates
                          </h4>
                          <p>Sep 10, 2023 - Sep 24, 2023</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Guests
                          </h4>
                          <p>2 Adults, 1 Child</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Total
                          </h4>
                          <p>$4,850</p>
                        </div>
                      </div>
                    </div>

                    {/* Cancelled Tour */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            African Safari Adventure
                          </h3>
                          <p className="text-muted-foreground">
                            Booking ID: BK-2022-9876
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-red-500 border-red-500"
                        >
                          Cancelled
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Dates
                          </h4>
                          <p>Mar 5, 2023 - Mar 15, 2023</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Guests
                          </h4>
                          <p>2 Adults</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Refund
                          </h4>
                          <p>$3,200 (80%)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>
                    View all your payment transactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Date</th>
                            <th className="text-left py-3 px-2">Description</th>
                            <th className="text-left py-3 px-2">Method</th>
                            <th className="text-right py-3 px-2">Amount</th>
                            <th className="text-right py-3 px-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-2">May 2, 2024</td>
                            <td className="py-3 px-2">
                              Bali Paradise Tour Deposit
                            </td>
                            <td className="py-3 px-2">Visa •••• 4242</td>
                            <td className="py-3 px-2 text-right">$500.00</td>
                            <td className="py-3 px-2 text-right">
                              <Badge className="bg-green-500">Paid</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">Aug 15, 2023</td>
                            <td className="py-3 px-2">
                              European Heritage Tour Final Payment
                            </td>
                            <td className="py-3 px-2">Mastercard •••• 5678</td>
                            <td className="py-3 px-2 text-right">$3,850.00</td>
                            <td className="py-3 px-2 text-right">
                              <Badge className="bg-green-500">Paid</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">Jul 1, 2023</td>
                            <td className="py-3 px-2">
                              European Heritage Tour Deposit
                            </td>
                            <td className="py-3 px-2">Mastercard •••• 5678</td>
                            <td className="py-3 px-2 text-right">$1,000.00</td>
                            <td className="py-3 px-2 text-right">
                              <Badge className="bg-green-500">Paid</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">Feb 10, 2023</td>
                            <td className="py-3 px-2">African Safari Refund</td>
                            <td className="py-3 px-2">Visa •••• 4242</td>
                            <td className="py-3 px-2 text-right">$3,200.00</td>
                            <td className="py-3 px-2 text-right">
                              <Badge className="bg-blue-500">Refunded</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-2">Jan 5, 2023</td>
                            <td className="py-3 px-2">
                              African Safari Deposit
                            </td>
                            <td className="py-3 px-2">Visa •••• 4242</td>
                            <td className="py-3 px-2 text-right">$1,000.00</td>
                            <td className="py-3 px-2 text-right">
                              <Badge
                                variant="outline"
                                className="text-red-500 border-red-500"
                              >
                                Cancelled
                              </Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Payment Methods
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-muted-foreground">
                                Expires 05/25
                              </p>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        <div className="flex items-center justify-between border rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5" />
                            <div>
                              <p className="font-medium">
                                Mastercard ending in 5678
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Expires 12/24
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
