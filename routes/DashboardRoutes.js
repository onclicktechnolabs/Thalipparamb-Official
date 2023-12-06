import { v4 as uuid } from "uuid";
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/admin",
  },
  // {
  //   id: uuid(),
  //   title: "PAGES",
  //   grouptitle: true,
  // },
  {
    id: uuid(),
    title: "Events",
    icon: "calendar",
    children: [
      { id: uuid(), link: "/admin/events/all", name: "All Events" },
      { id: uuid(), link: "/admin/events/new", name: "New Events" },
    ],
  },
  {
    id: uuid(),
    title: "Users",
    icon: "users",
    children: [
      { id: uuid(), link: "/admin/users/all", name: "All Users" },
      { id: uuid(), link: "/admin/users/new", name: "New Users" },
    ],
  },
  {
    id: uuid(),
    title: "Complaints",
    icon: "mail",
    children: [
      { id: uuid(), link: "/admin/complaints/all", name: "All Complaints" },
      { id: uuid(), link: "/admin/complaints/new", name: "New Complaints" },
    ],
  },
  {
    id: uuid(),
    title: "Happiness",
    icon: "smile-heart",
    children: [
      { id: uuid(), link: "/admin/happiness/all", name: "All Happiness" },
      { id: uuid(), link: "/admin/happiness/new", name: "New Happiness" },
    ],
  },
  {
    id: uuid(),
    title: "Employees",
    icon: "laptop",
    children: [
      { id: uuid(), link: "/admin/employees/all", name: "All Employees" },
      { id: uuid(), link: "/admin/employees/new", name: "New Employ" },
    ],
  },
  {
    id: uuid(),
    title: "News",
    icon: "book",
    children: [
      { id: uuid(), link: "/admin/news/all", name: "All News" },
      { id: uuid(), link: "/admin/news/new", name: "Create News" },
    ],
  },
  {
    id: uuid(),
    title: "Tourism",
    icon: "travel",
    children: [
      { id: uuid(), link: "/admin/tourism/all", name: "Tourism Lists" },
      { id: uuid(), link: "/admin/tourism/new", name: "New Tourism" },
    ],
  },
  {
    id: uuid(),
    title: "Wellness",
    icon: "heart",
    children: [
      { id: uuid(), link: "/admin/wellness/all", name: "All Wellness" },
      { id: uuid(), link: "/admin/wellness/new", name: "Add Wellness" },
    ],
  },

  {
    id: uuid(),
    title: "Gallery",
    icon: "image",
    children: [
      { id: uuid(), link: "/admin/gallery/all", name: "All Gallery" },
      { id: uuid(), link: "/admin/gallery/new", name: "Add gallery" },
    ],
  },
  {
    id: uuid(),
    title: "Settings",
    icon: "settings",
    link: "/admin/settings",
  },
];

export default DashboardMenu;
