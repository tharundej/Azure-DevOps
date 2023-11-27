import { useContext, useEffect, useMemo ,useState} from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import UserContext from 'src/nextzen/context/user/UserConext';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/sidebar/${name}.svg`} sx={{ width: 0.8, height: 0.8 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),

  g_dashboard: icon('dashboard'),
  g_employeeManagement: icon('employeeManagement'),
  g_leaveManagement: icon('leaveManagement'),
  g_timesheetManagement: icon('timesheetManagement'),
  g_shiftManagement: icon('shiftManagement'),
  g_claims: icon('claims'),
  g_payroll: icon('payroll'),
  g_itDeclarations: icon('itDeclarations'),
  g_monthlyAdditionalDeductions: icon('monthlyAdditionalDeductions'),
  g_appraisal: icon('appraisal'),
  g_configurations: icon('configurations'),

  g_assets: icon('assets'),
  g_factory: icon('factory'),
  g_vendor: icon('vendor'),
  g_materials: icon('materials'),
  g_products: icon('products'),
  g_customers: icon('customers'),
  g_purchases: icon('purchases'),
  g_balanceSheet: icon('balanceSheet'),
  g_expenses: icon('expenses'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();
  const {user}=useContext(UserContext);
  console.log(user,'UserContext')
  const [sidebarList,setSidebarList]=useState([])
  const items= [
    {
      title: t('Dashboard'),
      path: paths.dashboard.root,
      icon: ICONS.g_dashboard,
      key:'Dashboard'
    },
    // {
    //   title: t('signup'),
    //   path: paths.dashboard.general.signup,
    //   icon: ICONS.ecommerce,
    // },
    // {
    //   title: t('table'),
    //   path: paths.dashboard.table.root,
    //   icon: ICONS.dashboard,
    // },

    {
      title: t('Employee Management'),
      path: paths.dashboard.employee.root,
      icon: ICONS.g_employeeManagement,
      key:'employeeManagement'
    },
    {
      title: t('Leave Management'),
      path: paths.dashboard.leave.root,
      icon: ICONS.g_leaveManagement,
      key:'leaveManagement'
    },
    {
      title: t('Time Sheet Management'),
      path: paths.dashboard.timesheet.root,
      icon: ICONS.g_timesheetManagement,
      key:'timeSheetManagement'
    },
    {
      title: t('Shift Management'),
      path: paths.dashboard.Shift.root,
      icon: ICONS.g_shiftManagement,
      key:'shiftManagement'
    },
    {
      title: t('Claims'),
      path: paths.dashboard.claims.root,
      icon: ICONS.g_claims,
      // children: [
      //   {
      //     title: t('profile'),
      //   path: paths.dashboard.claims.compoffapprove },

      // ],
      key:'claims'
    },
    {
      title: t('Payroll'),
      path: paths.dashboard.payroll.root,
      icon: ICONS.g_payroll,
      key:'payroll'
    },
    {
      title: t('IT Declaration'),
      path: paths.dashboard.itdeclaration.root,
      icon: ICONS.g_itDeclarations,
      key:'itDeclaration',
      name:'IT Declaration'
    },
    {
      title: t('Monthly Additional Deductions'),
      path: paths.dashboard.monthlydeductions.root,
      icon: ICONS.g_monthlyAdditionalDeductions,
      key:'monthlyAdditionalDeductions'
    },
    {
      title: t('Appraisal Management'),
      path: paths.dashboard.appraisal.root,
      icon: ICONS.g_appraisal,
    },
    {
      title:t('configurations'),
      path:paths.dashboard.configurations.root,
      icon:ICONS.g_configurations,
      key:'configurations',
      children: [
        { title: t('Leave Configuration'), path: paths.dashboard.configurations.leaveconfiguration },
        { title: t('Compoff Configuration'), path: paths.dashboard.configurations.compoffconfiguration },
         { title: t('Appraisal Configuration'), path: paths.dashboard.configurations.appraisalconfiguration },
         { title: t('Expense Claim Configuration'), path: paths.dashboard.configurations.expenseclaimconfiguration },
         { title: t('Shift Configuration'), path: paths.dashboard.configurations.shiftconfiguration },
         { title: t('Role Configuration'), path: paths.dashboard.configurations.roleconfiguration },

      ],
    },
    // {
    //   title: t('Configuration'),
    //   path: paths.dashboard.employee.root,
    //   icon: ICONS.user,
    //   children: [
    //     { title: t('profile'), path: paths.dashboard.user.root },
    //     { title: t('cards'), path: paths.dashboard.user.cards },
    //     { title: t('list'), path: paths.dashboard.user.list },

    //   ],

    // },

    // {
    //   title: t('ecommerce'),
    //   path: paths.dashboard.general.ecommerce,
    //   icon: ICONS.ecommerce,
    // },
    // {
    //   title: t('analytics'),
    //   path: paths.dashboard.general.analytics,
    //   icon: ICONS.analytics,
    // },
    // {
    //   title: t('banking'),
    //   path: paths.dashboard.general.banking,
    //   icon: ICONS.banking,
    // },
    // {
    //   title: t('booking'),
    //   path: paths.dashboard.general.booking,
    //   icon: ICONS.booking,
    // },
    // {
    //   title: t('file'),
    //   path: paths.dashboard.general.file,
    //   icon: ICONS.file,
    // },
  ]

  useEffect(() => {
    const updateSidebarList = () => {
      if (user) {
        var arr = [];

        items.forEach((item) => {
          const permission = user?.rolePermissions[item?.key];
          console.log( typeof permission?.mainHeading,  permission?.mainHeading)
        if (permission && permission.hasOwnProperty('mainHeading') && permission.mainHeading) {
          console.log(`User Permission for ${item?.key}:`, permission);
          console.log(`mainHeading for ${item?.key}:`, permission.mainHeading);

          arr.push(item);
        }

        arr.push( {
          title: t('Dashboard'),
          path: paths.dashboard.root,
          icon: ICONS.g_dashboard,
          key:'Dashboard'
        })
        });

        setSidebarList(arr);
      }
    };

    updateSidebarList(); // Initial update

    // You might want to add additional dependencies if needed.
  }, [user]);
  

  const data = useMemo(
    () => [
     
      {
        subheader: t('HRMS'),
        items:sidebarList
      },

    
      {
        subheader: 'Accounting',
        items: [
          {
            title: t('factory'),
            path: paths.dashboard.factory.factory,
            icon: ICONS.g_factory,
          },
          {
            title: t('assets'),
            path: paths.dashboard.assets.assets,
            icon: ICONS.g_assets,
          },
          {
            title: t('vendor'),
            path: paths.dashboard.vendor.vendor,
            icon: ICONS.g_vendor,
          },
          {
            title: t('materials'),
            path: paths.dashboard.materials.materials,
            icon: ICONS.g_materials,
          },
          {
            title: t('products'),
            path: paths.dashboard.products.products,
            icon: ICONS.g_products,
          },
          {
            title: t('customers'),
            path: paths.dashboard.customers.customers,
            icon: ICONS.g_customers,
          },
          {
            title: t('purchase'),
            path: paths.dashboard.purchase.purchaseOrder,
            icon: ICONS.g_purchases,
            children: [
              { title: t('purchase Order'), path: paths.dashboard.purchase.purchaseOrder },
              { title: t('Purchase Invoice'), path: paths.dashboard.purchase.purchaseInvoice },
              { title: t('Purchase Payment'), path: paths.dashboard.purchase.purchasePayment },
            ],
          },
          {
            title: t('balancesheet'),
            path: paths.dashboard.balancesheet.balancesheet,
            icon: ICONS.g_balanceSheet,
          },
          {
            title: t('Expenses'),
            path: paths.dashboard.expenses.expenses,
            icon: ICONS.g_expenses,
          },
        ],
      },
    ],
    [t,sidebarList]
  );






  const data1 = useMemo(() => data, [data]);

  return data1 ;
}