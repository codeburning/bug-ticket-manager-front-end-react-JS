import { AppNavbar } from '../../component/navbar';
import { AppSideMenu } from '../../component/side-menu';
import './dashboard.css';
interface Props {
  children: JSX.Element;
}
const AppDashboard = (a: Props) => {
  return (
    <div className="app-dashboard">
      <div className="header">
        <AppNavbar />
      </div>
      <div className="container">
        <div className="left">
          <AppSideMenu />
        </div>
        <div className="right">{a.children}</div>
      </div>
    </div>
  );
};
export default AppDashboard;
