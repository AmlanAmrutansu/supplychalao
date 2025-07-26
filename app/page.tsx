import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SetupBanner } from "@/components/setup-banner"
import { Package, Truck, Users, Shield } from "lucide-react"

export default function HomePage() {
  // Check if environment variables are configured
  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"

  return (
    <div className="min-h-screen">
      {/* Setup Banner */}
      {!isConfigured && <SetupBanner />}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Supply Chalao</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your complete supply management solution. Track, manage, and optimize your supply chain with ease.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" disabled={!isConfigured}>
                  {isConfigured ? "Get Started" : "Setup Required"}
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  disabled={!isConfigured}
                >
                  {isConfigured ? "Login" : "Setup Required"}
                </Button>
              </Link>
            </div>
            {!isConfigured && (
              <p className="text-sm text-blue-200 mt-4">
                Please configure your Supabase environment variables to enable authentication
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Supply Chalao?</h2>
            <p className="text-xl text-gray-600">Streamline your supply management with our powerful features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create, track, and manage all your supply orders in one place with real-time updates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Monitor your orders with live status updates and delivery tracking.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Team Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Collaborate with your team through integrated messaging system.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your data is protected with enterprise-grade security and reliability.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of businesses already using Supply Chalao</p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" disabled={!isConfigured}>
              {isConfigured ? "Start Your Free Trial" : "Complete Setup First"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
