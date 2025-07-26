"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, Users, BarChart3 } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Supply Chalao</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your supply chain management with our comprehensive platform. Track orders, manage inventory, and
            communicate with your team all in one place.
          </p>

          {user ? (
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Supply Chalao?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track and manage all your supply orders in real-time with status updates and notifications.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Supply Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your supply chain from order placement to delivery with detailed tracking information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Team Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Collaborate with your team through integrated messaging and real-time updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get insights into your supply chain performance with detailed analytics and reporting.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Supply Chain?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Supply Chalao to streamline their operations.
          </p>

          {!user && (
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
