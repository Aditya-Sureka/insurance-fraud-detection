import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <span className="text-2xl font-bold text-primary">SBI Life</span>
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  Fraud Detection
                </span>
              </a>
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/education">
                  <NavigationMenuLink className="px-3 py-2 text-sm">
                    Education
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/success-stories">
                  <NavigationMenuLink className="px-3 py-2 text-sm">
                    Success Stories
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {user ? (
                <>
                  <NavigationMenuItem>
                    <Link href="/dashboard">
                      <NavigationMenuLink className="px-3 py-2 text-sm">
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => logoutMutation.mutate()}
                      className="px-3 py-2 text-sm"
                    >
                      Logout
                    </Button>
                  </NavigationMenuItem>
                </>
              ) : (
                <NavigationMenuItem>
                  <Link href="/auth">
                    <Button variant="default">Login</Button>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}
