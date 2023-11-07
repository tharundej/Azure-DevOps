import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import TimeApprovals from 'src/nextzen/TimeSheetManagement/TimeApprovals';
import TimeProject from 'src/nextzen/TimeSheetManagement/TimeProject';
import Shift from 'src/nextzen/Table/components/shiftmanagement/Shift';

// ----------------------------------------------------------------------

// employee Management

const EmployeeManagementHome = lazy(() =>
  import('src/nextzen/employeemanagment/employeemanagementhome/EmployeeManagementHome')
);
const EmployeeView = lazy(() =>
  import('../../nextzen/employeemanagment/employeeview/EmployeeView')
);

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------
// const BasicTable = lazy(() => import('src/nextzen/Table/BasicTable'));
const UserNewEditForm1 = lazy(() => import('src/nextzen/Table/components/UserNewEditForm1'));
// const UserEditView = lazy(() => import('src/nextzen/components/UserEditViews'));
const Edits = lazy(() => import('src/nextzen/Table/components/Edits'));
const ReuseTable = lazy(() => import('src/nextzen/Table/reusetable'));
const ReuseTableTwo = lazy(() => import('src/nextzen/Table/Reuseabletwo'));

// signup------------------------
const SignupHome = lazy(() => import('src/nextzen/signup/SignupHome'));
const OnBoardForm = lazy(() => import('src/nextzen/employeemanagment/onboradform/OnboardForm'));

// claims------------------------
const Claims = lazy(() => import('src/nextzen/claims/Claims'));
const CompoffApprove = lazy(() => import('src/nextzen/claims/components/CompoffApprove'));
const MyCompoff = lazy(() => import('src/nextzen/claims/components/MyCompoff'));

// IT Declaration------------------------
const Itdeclaration = lazy(() => import('src/nextzen/ITDeclaration/Itdeclaration'));

// Leave manangement------------------------
const Leave = lazy(() => import('src/nextzen/LeaveManagement/Leave'));

// Time Sheet manangement------------------------
const TimeSheet = lazy(() => import('src/nextzen/TimeSheetManagement/Time'));

// Payroll manangement------------------------
const Payroll = lazy(() => import('src/nextzen/Payroll/Payroll'));

const PaySchedule = lazy(() => import('src/nextzen/Payroll/payschedule/PaySchedule'));

const PayScheduleform = lazy(() => import('src/nextzen/Payroll/payschedule/PayScheduleform'));

// Monthly Deductions manangement------------------------
const MonthlyDeductions = lazy(() => import('src/nextzen/MonthlyDeductions/Month'));

// Appraisal manangement------------------------
const Appraisal = lazy(() => import('src/nextzen/AppraisalManagement/Appraisal'));

// const Configaration = lazy(()=> import('src/nextzen/configaration/Configaration'));

// const LeaveConfiguration=lazy(()=>import('src/nextzen/configaration/leaveconfiguration/LeaveConfiguration'));

// const CompoffConfiguration = lazy(()=> import('src/nextzen/configaration/compoffconfiguration/CompoffConfiguration'));

// const MailConfiguration = lazy(()=> import('src/nextzen/configaration/mailconfiguration/MailConfiguration'));

// const AppraisalConfiguration = lazy(()=> import('src/nextzen/configaration/appraisalconfiguration/AppraisalConfiguration'));

// const ExpensClaimConfiguration = lazy(()=> import('src/nextzen/configaration/expenseclaimconfiguration/ExpenseClaimConfiguration'));

// const ShiftConfiguration = lazy(()=> import('src/nextzen/configaration/shiftconfiguration/ShiftConfiguration'));
// factory
const FactoryIndex = lazy(() => import('src/nextzen/factory/Factory'));
const VendorIndex = lazy(() => import('src/nextzen/vendor/Vendor'));
const Materials = lazy(() => import('src/nextzen/Materials/Materials'));
const Assets = lazy(() => import('src/nextzen/assets/Assets'));
const Products = lazy(() => import('src/nextzen/Products/Products'));
const Customers = lazy(() => import('src/nextzen/Customers/Customers'));
const PurchaseOrder = lazy(() => import('src/nextzen/Purchase/PurchaseOrder/PurchaseOrder'));
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),

    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'signup', element: <SignupHome /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },

      {
        path: 'table',
        children: [
          { element: <ReuseTable />, index: true },
          { path: 'userneweditform', element: <UserNewEditForm1 /> },
          { path: ':id/edit', element: <Edits /> },

          // { path: 'reusetable', element: <ReuseTable /> },
          // { path: 'reusetabletwo', element: <ReuseTableTwo /> },
        ],
      },

      {
        path: 'employeemanagementhome',
        children: [
          { element: <EmployeeManagementHome />, index: true },
          { path: ':id/edit', element: <Edits /> },
          { path: 'userneweditform', element: <UserNewEditForm1 /> },
          { path: 'onboardform', element: <OnBoardForm /> },

          { path: 'employeeview', element: <EmployeeView /> },
          //  { path: ':id/edit', element: <Edits /> },
          // { path: 'reusetable', element: <ReuseTable /> },
          //  { path: 'reusetabletwo', element: <ReuseTableTwo /> },
        ],
      },

      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },

          // { path: 'reusetable', element: <ReuseTable /> },
          // { path: 'reusetabletwo', element: <ReuseTableTwo /> },
        ],
      },

      {
        path: 'leave',
        children: [
          { element: <Leave />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'timesheet',
        children: [
          { element: <TimeSheet />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'shift',
        children: [
          { element: <Shift />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'timeapprovals',
        children: [
          { element: <TimeApprovals />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'timeproject',
        children: [
          { element: <TimeProject />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },

      {
        path: 'claims',
        children: [
          { element: <Claims />, index: true },
          { path: 'compoffapprove', element: <CompoffApprove /> },
          { path: 'mycompoff', element: <MyCompoff /> },
        ],
      },

      {
        path: 'payroll',
        children: [
          { element: <Payroll />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
          { path: 'payschedule', element: <PaySchedule /> },
          { path: ':id/payscheduleform', element: <PayScheduleform /> },
        ],
      },
      {
        path: 'itdeclaration',
        children: [
          { element: <Itdeclaration />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'monthlydeductions',
        children: [
          { element: <MonthlyDeductions />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },

      {
        path: 'appraisal',
        children: [
          { element: <Appraisal />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },
        ],
      },
      // {
      //   path:'configaration',
      //   children:[
      //     {
      //       element: <Configaration/>,index:true
      //     },
      //     {path:'leaveconfiguration',element:<LeaveConfiguration/>}
      //   ],
      // },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
      {
        path: 'factory',
        children: [
          {
            element: <FactoryIndex />,
            index: true,
          },
        ],
      },
      {
        path: 'vendor',
        children: [
          {
            element: <VendorIndex />,
            index: true,
          },
        ],
      },
      {
        path: 'materials',
        children: [
          {
            element: <Materials />,
            index: true,
          },
        ],
      },
      {
        path: 'assets',
        children: [
          {
            element: <Assets />,
            index: true,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            element: <Products />,
            index: true,
          },
        ],
      },
      {
        path: 'customers',
        children: [
          {
            element: <Customers />,
            index: true,
          },
        ],
      },
      {
        path: 'purchase',
        children: [
          { element: <PurchaseOrder />, index: true },
          { path: 'order', element: <PurchaseOrder /> },
          { path: 'invoice', element: <PurchaseOrder /> },
          { path: 'payment', element: <PurchaseOrder /> },
        ],
      },
    ],
  },
];
