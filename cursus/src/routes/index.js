import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ViewCourse from "~/pages/ViewCourse";
import ViewCourseDetails from "~/pages/ViewCourse/ViewCourseDetails";
import EnrollCourse from "~/pages/EnrollCourse";
import ForgotPassword from "~/pages/Login/ForgotPassword";
import RegisterStudent from "~/pages/Login/RegisterStudent";
import RegisterInstructor from "~/pages/Login/RegisterInstructor";
import ViewInstructor from "~/pages/ViewInstructor";
import ViewCart from "~/pages/ViewCart";
import SearchPage from "~/pages/SearchPage";
import BookMark from "~/pages/BookMark";
import Transaction from "~/pages/Transaction";
import Profile from "~/pages/Login/Profile";

const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },
  {
    path: "/course-details",
    component: ViewCourseDetails,
    layout: ViewCourseDetails,
  },
  {
    path: "/book-mark",
    component: BookMark,
    layout: BookMark,
  },
  {
    path: "/profile",
    component: Profile,
    layout: Profile,
  },
  {
    path: "/transaction",
    component: Transaction,
    layout: Transaction,
  },
  {
    path: "/view-course",
    component: ViewCourse,
    layout: ViewCourse,
  },
  {
    path: "/search",
    component: SearchPage,
    layout: SearchPage,
  },
  { path: "/enroll-course", component: EnrollCourse, layout: EnrollCourse },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    layout: ForgotPassword,
  },
  {
    path: "/register-student",
    component: RegisterStudent,
    layout: RegisterStudent,
  },
  {
    path: "/register-instructor",
    component: RegisterInstructor,
    layout: RegisterInstructor,
  },
  {
    path: "/view-instructor",
    component: ViewInstructor,
    layout: ViewInstructor,
  },
  {
    path: "/view-cart",
    component: ViewCart,
    layout: ViewCart,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
