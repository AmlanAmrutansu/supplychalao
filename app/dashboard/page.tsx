"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Package, Truck, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  item_name: string
  quantity: number
  status: string
  created_at: string
  supplier: string
  delivery_date: string
}

interface ZoneData {
  name: string
  totalOrders: number
  moq: number
  progress: number
  isMoqMet: boolean
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Hardcoded zone data as requested
  const zoneData: ZoneData[] = [
    {
      name: "Zone A",
      totalOrders: 52,
      moq: 100,
      progress: 52,
      isMoqMet: false,
    },
    {
      name: "Zone B",
      totalOrders: 87,
      moq: 100,
      progress: 87,
      isMoqMet: false,
    },
    {
      name: "Zone C",
      totalOrders: 103,
      moq: 100,
      progress: 100,
      isMoqMet: true,
    },
  ]

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">242</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">2 unread</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">On-time delivery</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/orders/new">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Order
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="outline">View Messages</Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline">Settings</Button>
              </Link>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No orders found.{" "}
                    <Link href="/orders/new" className="text-blue-600 hover:underline">
                      Create your first order
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{order.item_name}</h3>
                            <p className="text-sm text-gray-500">
                              Quantity: {order.quantity} • Supplier: {order.supplier}
                            </p>
                            <p className="text-xs text-gray-400">
                              Created: {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            <Link href={`/orders/edit/${order.id}`}>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Zone-wise Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Zone-wise Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {zoneData.map((zone) => (
                <Card key={zone.name} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-900">{zone.name}</CardTitle>
                      <Badge
                        variant={zone.isMoqMet ? "default" : "secondary"}
                        className={zone.isMoqMet ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {zone.isMoqMet ? "✅ MOQ Met" : "⚠️ Below MOQ"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Orders</span>
                      <span className="text-2xl font-bold text-gray-900">{zone.totalOrders}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">MOQ Target</span>
                      <span className="text-sm font-medium text-gray-900">{zone.moq}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{zone.progress}%</span>
                      </div>
                      <Progress
                        value={zone.progress}
                        className="h-2"
                        style={{
                          backgroundColor: "#f3f4f6",
                        }}
                      />
                    </div>

                    <div className="text-xs text-gray-500 pt-2">
                      {zone.isMoqMet
                        ? `Exceeded MOQ by ${zone.totalOrders - zone.moq} orders`
                        : `${zone.moq - zone.totalOrders} more orders needed to reach MOQ`}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
