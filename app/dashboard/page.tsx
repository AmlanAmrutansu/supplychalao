"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toast, useToast } from "@/components/toast"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  title: string
  description: string
  status: string
  created_at: string
  user_id: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    fetchOrders()

    // Set up real-time subscription
    const subscription = supabase
      .channel("orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload) => {
        fetchOrders() // Refetch orders on any change
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      showToast("Error fetching orders", "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return

    try {
      const { error } = await supabase.from("orders").delete().eq("id", id)

      if (error) throw error
      showToast("Order deleted successfully", "success")
      fetchOrders()
    } catch (error) {
      showToast("Error deleting order", "error")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.name || user?.email}!
          </h1>
          <p className="text-gray-600">Manage your supply orders and track their progress.</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Orders</h2>
          <Link href="/orders/new">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Order</span>
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-600 mb-2">No orders yet</CardTitle>
              <CardDescription className="mb-4">
                Create your first order to get started with supply management.
              </CardDescription>
              <Link href="/orders/new">
                <Button>Create Your First Order</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{order.title}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </div>
                  <CardDescription className="text-sm text-gray-500">
                    Created: {new Date(order.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{order.description}</p>
                  <div className="flex space-x-2">
                    <Link href={`/orders/edit/${order.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                        <Edit className="h-3 w-3" />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteOrder(order.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </ProtectedRoute>
  )
}
