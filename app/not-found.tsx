import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">404</CardTitle>
          <CardDescription className="text-lg">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
