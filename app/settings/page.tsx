"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, User, Bell, Palette } from "lucide-react"

interface UserSettings {
  id: string
  notifications_enabled: boolean
  email_updates: boolean
  theme: "light" | "dark"
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (user) {
      setEmail(user.email || "")
      setFullName(user.user_metadata?.full_name || "")
      fetchSettings()
    }
  }, [user])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from("settings").select("*").eq("user_id", user?.id).single()

      if (error && error.code !== "PGRST116") throw error

      if (data) {
        setSettings(data)
      } else {
        // Create default settings if none exist
        const { data: newSettings, error: createError } = await supabase
          .from("settings")
          .insert([
            {
              user_id: user?.id,
              notifications_enabled: true,
              email_updates: true,
              theme: "light",
            },
          ])
          .select()
          .single()

        if (createError) throw createError
        setSettings(newSettings)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      })

      if (error) throw error

      // Also update the users table
      await supabase.from("users").update({ full_name: fullName }).eq("id", user?.id)

      setSuccess("Profile updated successfully!")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    if (!settings) return

    try {
      const updatedSettings = { ...settings, ...newSettings }

      const { error } = await supabase.from("settings").update(updatedSettings).eq("user_id", user?.id)

      if (error) throw error

      setSettings(updatedSettings)
      setSuccess("Settings updated successfully!")
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (loading) {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
          </div>

          {(error || success) && (
            <Alert variant={error ? "destructive" : "default"} className="mb-6">
              <AlertDescription>{error || success}</AlertDescription>
            </Alert>
          )}

          {/* Profile Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and account details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} disabled className="bg-gray-50" />
                  <p className="text-sm text-gray-500">
                    Email cannot be changed. Contact support if you need to update your email.
                  </p>
                </div>

                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you want to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications about order updates and messages.</p>
                </div>
                <Switch
                  checked={settings?.notifications_enabled || false}
                  onCheckedChange={(checked) => updateSettings({ notifications_enabled: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Updates</Label>
                  <p className="text-sm text-gray-500">Receive email notifications about important updates.</p>
                </div>
                <Switch
                  checked={settings?.email_updates || false}
                  onCheckedChange={(checked) => updateSettings({ email_updates: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <p className="text-sm text-gray-500 mb-3">Choose your preferred theme for the application.</p>
                  <div className="flex space-x-4">
                    <Button
                      variant={settings?.theme === "light" ? "default" : "outline"}
                      onClick={() => updateSettings({ theme: "light" })}
                      className="flex-1"
                    >
                      Light
                    </Button>
                    <Button
                      variant={settings?.theme === "dark" ? "default" : "outline"}
                      onClick={() => updateSettings({ theme: "dark" })}
                      className="flex-1"
                    >
                      Dark
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
