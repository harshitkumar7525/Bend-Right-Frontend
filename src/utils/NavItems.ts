type NavItem = {
  name: string;
  href: string;
  current?: boolean;
};
const navigationBase: NavItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Sign Up",
    href: "/signup",
  },
  {
    name: "Sign In",
    href: "/signin",
  },
  {
    name: "Sign Out",
    href: "/signout",
  }
];
export default navigationBase;
export type { NavItem };