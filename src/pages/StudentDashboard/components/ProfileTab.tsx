import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Trophy,
  User,
  Lock,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

interface ProfileTabProps {
  user: any;
}

export default function ProfileTab({ user }: ProfileTabProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock data for overview
  const stats = {
    totalHours: 124,
    weeklyHours: 8.5,
    papersSolved: 24,
    quizzesPassed: 18,
    completionRate: 78,
  };

  const userInitials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className=" mx-auto space-y-6 animate-fade-in-up">
      {/* Simple Profile Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-display font-bold text-primary-foreground">
            {userInitials}
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              {user.name}
            </h1>
            <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> {user.mobile}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {user.district}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> A/L {user.alYear}
              </span>
            </div>
          </div>
          <Badge className="ml-auto bg-primary/10 text-primary border-0">
            Active Student
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Study Stats */}
        <TabsContent value="overview" className="space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {stats.totalHours}h
              </p>
              <p className="text-xs text-muted-foreground">Total Study Time</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <BookOpen className="h-5 w-5 text-accent mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {stats.papersSolved}
              </p>
              <p className="text-xs text-muted-foreground">Papers Solved</p>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <Trophy className="h-5 w-5 text-warning mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">
                {stats.quizzesPassed}
              </p>
              <p className="text-xs text-muted-foreground">Quizzes Passed</p>
            </div>
          </div>

          {/* Syllabus Progress */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              Syllabus Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">Pure Mathematics</span>
                  <span className="text-muted-foreground">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">Applied Mathematics</span>
                  <span className="text-muted-foreground">64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">Overall Completion</span>
                  <span className="text-muted-foreground">
                    {stats.completionRate}%
                  </span>
                </div>
                <Progress value={stats.completionRate} className="h-2" />
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-warning" />
              Earned Badges
            </h3>
            <div className="flex gap-2 flex-wrap">
              {user.badges && user.badges.length > 0 ? (
                user.badges.map((b: string) => (
                  <Badge key={b} variant="secondary" className="gap-1 py-1">
                    <Star className="h-3 w-3 text-warning" />
                    {b}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  No badges yet — keep studying!
                </span>
              )}
            </div>
          </div>
        </TabsContent>

        {/* General Tab - Personal Details */}
        <TabsContent value="general" className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Personal Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue={user.name}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    defaultValue={user.mobile}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    defaultValue={user.district}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="alYear">A/L Year</Label>
                  <Input
                    id="alYear"
                    defaultValue={user.alYear}
                    className="mt-1"
                    disabled
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab - Password Change */}
        <TabsContent value="security" className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">
              Change Password
            </h3>

            <div className="space-y-4 max-w-md">
              {/* Current Password */}
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button className="w-full mt-2">
                <Lock className="h-4 w-4 mr-2" /> Update Password
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
