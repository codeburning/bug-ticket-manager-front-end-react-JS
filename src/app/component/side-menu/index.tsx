import { NavLink } from 'react-router-dom';
import './menu.css';
export const AppSideMenu = () => {
  return (
    <>
      <div className="side-menu">
        <ul>
          <li>
            <NavLink to={'/'}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={'/tickets'}>Tickets</NavLink>
          </li>
          <li>
            <NavLink to={'/teams'}>Teams</NavLink>
          </li>
          <li>
            <NavLink to={'/users'}>Users</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
