import Home from "~/pages/Home";
import Login from "~/pages/Login";
import ViewCourse from "~/pages/ViewCourse";
import ViewCourseDetails from "~/pages/ViewCourse/ViewCourseDetails";
import EnrollCourse from "~/pages/EnrollCourse";
import ForgotPassword from "~/pages/Login/ForgotPassword";
import ResetPassword from "~/pages/Login/ResetPassword";
import RegisterStudent from "~/pages/Login/RegisterStudent";
import RegisterInstructor from "~/pages/Login/RegisterInstructor";
import ViewInstructor from "~/pages/ViewInstructor";
import ViewCart from "~/pages/ViewCart";
import SearchPage from "~/pages/SearchPage";
import BookMark from "~/pages/BookMark";
import Transaction from "~/pages/Transaction";
import Profile from "~/pages/Login/Profile";
import About from "~/pages/Home/About";
import Checkout from "~/pages/Checkout";
import OrderReceive from "~/pages/Checkout/OrderReceive";
import OrderReceiveCheckOut from "~/pages/Checkout/OrderReceiveCheckOut";

import Policy from "~/pages/Policy";
import DashBoardInstructor from "~/pages/DashBoardInstructor";
import ProfileInstructor from "~/pages/DashBoardInstructor/ProfileInstructor";
const publicRoutes = [
  { path: "/", component: Home, layout: Home },
  { path: "/login", component: Login, layout: Login },

  {
    path: "/course-details/:courseId",
    component: ViewCourseDetails,
    layout: ViewCourseDetails,
  },
  {
    path: "/order-received-checkout",
    component: OrderReceiveCheckOut,
    layout: OrderReceiveCheckOut,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    layout: ResetPassword,
  },
  {
    path: "/profile-instructor",
    component: ProfileInstructor,
    layout: ProfileInstructor,
  },
  {
    path: "/instructor-dash-board",
    component: DashBoardInstructor,
    layout: DashBoardInstructor,
  },
  {
    path: "/term-policy",
    component: Policy,
    layout: Policy,
  },
  {
    path: "/order-received",
    component: OrderReceive,
    layout: OrderReceive,
  },
  {
    path: "/book-mark",
    component: BookMark,
    layout: BookMark,
  },
  {
    path: "/check-out",
    component: Checkout,
    layout: Checkout,
  },
  {
    path: "/about",
    component: About,
    layout: About,
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
    path: "/view-instructor/:instructorName",
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
