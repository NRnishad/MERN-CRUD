import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import appStore from './redux/appStore';
import { fetchCurrentUser } from './redux/slices/userSlice';
import { fetchCurrentAdmin } from './redux/slices/adminSlice';
import Header from './components/Header';
import HeaderAdmin from './components/HeaderAdmin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';


const AuthInit = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector(state => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return children;
};


const AuthAdminInit = ({ children }) => {
  const dispatch = useDispatch();
  const { adminToken, isLoadingAdmin } = useSelector(state => state.admin);

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchCurrentAdmin());
    }
  }, [adminToken, dispatch]);

  if (isLoadingAdmin) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return children;
};


const ProtectedRoute = ({ children }) => {
  const { token } = useSelector(state => state.user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


const AdminProtectedRoute = ({ children }) => {
  const { adminToken } = useSelector(state => state.admin);

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};


const AuthRoute = ({ children }) => {
  const { token } = useSelector(state => state.user);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};


const AuthAdminRoute = ({ children }) => {
  const { adminToken } = useSelector(state => state.admin);

  if (adminToken) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};


const UserLayout = () => {
  return (
    <div className="h-screen bg-black pb-96">
      <Header />
      <Outlet />
    </div>
  );
};


const AdminLayout = () => {
  return (
    <div className="h-screen bg-white pb-96">
      <HeaderAdmin />
      <Outlet />
    </div>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <AuthAdminRoute>
        <AdminLogin />
      </AuthAdminRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <AdminDashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <AuthInit>
        <AuthAdminInit>
          <RouterProvider router={appRouter} />
        </AuthAdminInit>
      </AuthInit>
    </Provider>
  );
}

export default App;
