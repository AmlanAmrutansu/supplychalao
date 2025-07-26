"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, ExternalLink } from "lucide-react"

export function SetupBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <CardTitle className="text-lg text-yellow-800">Setup Required</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="text-yellow-700">
              Supabase environment variables are not configured. Please complete the setup to use all features.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-2">To get started:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>
                    Create a Supabase project at{" "}
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
                      supabase.com
                    </a>
                  </li>
                  <li>Copy your project URL and anon key</li>
                  <li>
                    Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in your project root
                  </li>
                  <li>Add your Supabase credentials (see README.md for details)</li>
                  <li>Run the database setup script in your Supabase dashboard</li>
                </ol>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://supabase.com", "_blank")}
                  className="bg-white hover:bg-yellow-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Supabase
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://github.com/your-repo#setup", "_blank")}
                  className="bg-white hover:bg-yellow-50"
                >
                  View Setup Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
