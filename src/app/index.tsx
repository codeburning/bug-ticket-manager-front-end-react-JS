import AppRoutes from './routes';
import './css/app.css';
import { Provider } from 'react-redux';
import { store } from './slice';
/**
 * Setting up redux using React toolkit
 * @returns 
 */
export const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};
