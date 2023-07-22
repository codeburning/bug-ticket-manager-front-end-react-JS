import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginContainer } from '../container/auth/login';
import { RegisterContainer } from '../container/auth/register';
import { useAppSelector } from '../slice';
import AppDashboard from '../container/dashboard';
import { TicketsContainer } from '../container/tickets';
import { UserContainer } from '../container/users';
import { TeamContainer } from '../container/teams';
import { TicketSingleViewContainer } from '../container/tickets/singleView';
const AppRoutes = () => {
  const { loggedIn } = useAppSelector((a) => a.authReducer);
  /**
   * User is logged in than protected routes will be served
   */
  return (
    <>
      <BrowserRouter>
        <Routes>
          {loggedIn ? (
            <Route path="/">
              <Route
                index
                element={
                  <AppDashboard
                    children={
                      <>Home screen dashboard charts can be added here</>
                    }
                  />
                }
              />
              <Route
                path="/teams"
                element={<AppDashboard children={<TeamContainer />} />}
              />
              <Route path="/tickets">
                <Route
                  index
                  element={<AppDashboard children={<TicketsContainer />} />}
                />
                <Route
                  path=":ticketId"
                  element={
                    <AppDashboard children={<TicketSingleViewContainer />} />
                  }
                />
              </Route>
              <Route
                path="/users"
                element={<AppDashboard children={<UserContainer />} />}
              />
            </Route>
          ) : (
            <Route path="/">
              <Route index element={<LoginContainer />} />
              <Route path="register" element={<RegisterContainer />} />
            </Route>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRoutes;
