import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  Menu,
  Search,
  Building,
  Briefcase,
  Bell,
  UserCircle,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  isLoggedIn?: boolean;
  isEmployer?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn: initialIsLoggedIn = false, 
  isEmployer: initialIsEmployer = false 
}) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = React.useState(initialIsLoggedIn);
  const [isEmployer, setIsEmployer] = React.useState(initialIsEmployer);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const publicNavItems = [
    { label: "Find Jobs", href: "/jobs", icon: Briefcase },
    { label: "Companies", href: "/companies", icon: Building },
  ];

  const jobSeekerNavItems = [
    { path: "/job-alerts", label: "Job Alerts", icon: Bell },
  ];

  const employerNavItems = [
    { path: "/employer/jobs", label: "My Jobs", icon: Briefcase },
    { path: "/employer/candidates", label: "Candidates", icon: UserCircle },
    { path: "/employer/analytics", label: "Analytics", icon: Bell },
  ];

  const renderNavItems = (items: typeof publicNavItems) => (
    <div className="flex items-center space-x-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-job-primary/10 text-job-primary"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  const renderMobileNav = (items: typeof publicNavItems) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-job-primary/10 text-job-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            {!isMobile && renderNavItems(publicNavItems)}
            {isLoggedIn && renderNavItems(isEmployer ? employerNavItems : jobSeekerNavItems)}
          </div>

          <div className="flex items-center space-x-4">
            {isMobile && renderMobileNav(publicNavItems)}
            {isLoggedIn && renderMobileNav(isEmployer ? employerNavItems : jobSeekerNavItems)}
            
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-job-primary hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserCircle className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/profile" className="flex items-center w-full">
                          <UserCircle className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/settings" className="flex items-center w-full">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/help" className="flex items-center w-full">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Help</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
