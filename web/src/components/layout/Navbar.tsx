import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../features/auth/authStore";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

const linkClass =
  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";

export const Navbar = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = user?.role === "admin";

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/" className="text-xl font-bold tracking-tight">
                BlogApp
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap items-center gap-2">
            {token ? (
              <>
                <NavigationMenuItem>
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/blog/new" className={linkClass}>
                    New post
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/profile" className={linkClass}>
                    Profile
                  </NavLink>
                </NavigationMenuItem>
                {isAdmin ? (
                  <NavigationMenuItem>
                    <NavLink to="/admin" className={linkClass}>
                      Admin
                    </NavLink>
                  </NavigationMenuItem>
                ) : null}
                <NavigationMenuItem>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Log out
                  </Button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavLink to="/login" className={linkClass}>
                    Log in
                  </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavLink to="/register" className={linkClass}>
                    Register
                  </NavLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
