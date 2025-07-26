"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  title: string
  description: string
  status: string
  user_id: string
}

export default function EditOrderPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("pending")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && params.id) {
      fetchOrder()
    }
  }, [user, params.id])

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", user?.id)
        .single()

      if (error) throw error

      setOrder(data)
      setTitle(data.title)
      setDescription(data.description)
      setStatus(data.status)
    } catch (error: any) {
      setError("Order not found or you don't have permission to edit it")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          title: title.trim(),
          description: description.trim(),
          status,
        })
        .eq("id", params.id)
        .eq("user_id", user?.id)

      if (error) throw error

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    setError("")

    try {
      const { error } = await supabase.from("orders").delete().eq("id", params.id).eq("user_id", user?.id)

      if (error) throw error

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
      setDeleting(false)
    }
  }

  if (!order && !error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Order</h1>
            <p className="text-gray-600 mt-2">Update your supply order information</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Update the information for your supply order</CardDescription>
            </CardHeader>
            <CardContent>
              {error && !order ? (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Order Title *</Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter order title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the order details, quantities, specifications, etc."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Updating..." : "Update Order"}
                    </Button>
                    <Link href="/dashboard">
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              )}

              {order && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-red-900">Danger Zone</h3>
                      <p className="text-sm text-red-600">
                        Permanently delete this order. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      {deleting ? "Deleting..." : "Delete Order"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
