import { Outlet } from 'react-router';
import { meta, links, Layout } from './theme';

export { meta, links, Layout };

export default function App() {
  return <Outlet />;
}
