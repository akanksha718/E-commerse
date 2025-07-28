import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/Shopping-view/layout'
import NotFound from './pages/not-found'
import Shoppinghome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccounts from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import { Skeleton } from './components/ui/skeleton'
function App() {
  const { user, isAuthenticated, isloading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isloading) return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path="home" element={<Shoppinghome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccounts />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
