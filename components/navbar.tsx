"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Package, LogOut, User, MessageSquare, Settings, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const { user, signOut, isConfigured } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const navItems = user
    ? [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/messages", label: "Messages", icon: MessageSquare },
        { href: "/settings", label: "Settings", icon: Settings },
      ]
    : [
        { href: "/login", label: "Login", icon: User },
        { href: "/register", label: "Register", icon: User },
      ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Supply Chalao</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isConfigured &&
              navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}

            {!isConfigured && <span className="text-yellow-600 text-sm font-medium">Setup Required</span>}

            {user && isConfigured && (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l">
                <span className="text-sm text-gray-600">Welcome, {user.user_metadata?.full_name || user.email}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-4">
                  <Link href="/" className="flex items-center space-x-2 mb-4">
                    <Package className="h-6 w-6 text-blue-600" />
                    <span className="text-lg font-bold">Supply Chalao</span>
                  </Link>

                  {!isConfigured && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded text-sm">
                      Setup Required - Configure Supabase
                    </div>
                  )}

                  {isConfigured &&
                    navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                  {user && isConfigured && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-2">
                        Logged in as {user.user_metadata?.full_name || user.email}
                      </p>
                      <Button onClick={handleSignOut} variant="outline" className="w-full bg-transparent">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
