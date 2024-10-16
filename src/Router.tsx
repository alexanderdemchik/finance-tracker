import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/Home.page';
import { RouterLayout } from './layout/RouterLayout/RouterLayout';
import { ChartsPage } from './pages/Charts.page';
import { RoutesPathsEnum } from './constants/routes';
import { AccountsPage } from './pages/accounts/Accounts.page';

const router = createBrowserRouter([
  {
    path: RoutesPathsEnum.HOME,
    element: <RouterLayout />,
    children: [
      {
        path: RoutesPathsEnum.HOME,
        element: <HomePage />,
      },
      {
        path: RoutesPathsEnum.CHARTS,
        element: <ChartsPage />,
      },
      {
        path: RoutesPathsEnum.ACCOUNTS,
        element: <AccountsPage />,
      },
      {
        path: RoutesPathsEnum.SETTINGS,
        element: <ChartsPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
