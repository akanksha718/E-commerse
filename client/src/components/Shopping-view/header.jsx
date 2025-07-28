import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HousePlug, Menu, ShoppingCart, UserCog, LogOut } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/authSlice'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '@/store/shop/cart-Slice'
function MenuItems() {
  return <nav className='flex flex-col p-6 mb-2 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItems => <Link className='text-sm font-medium' to={menuItems.path} key={menuItems.id}>{menuItems.label}</Link>)
    }
  </nav>
}
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.shopCart)
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch])
  // console.log(cartItems);
  
  return <div className='flex lg:items-center lg:flex-row flex-col gap-3'>
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button onClick={() => setOpenCartSheet(true)} variant={'outline'} size='icon'>
        <ShoppingCart className=' w-6 h-5' />
        <span className='sr-only'>User Cart</span>
      </Button>
      <UserCartWrapper  cartItems={cartItems && cartItems.items && cartItems.items.length>0?cartItems.items:[]} />
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={'bg-black'}>
          <AvatarFallback className={'bg-black text-white font-extrabold'}>
            {user?.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' className={'w-56'}>
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}><UserCog className='mr-2 h-4 w-4' />Account</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} ><LogOut className='mr-2 h-4 w-4' />Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}
const ShoppingHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to={'/shop/home'} className='flex items-center gap-2'>
          <HousePlug className='h-8 w-6' />
          <span className='font-bold text-3xl italic'>For-Ever</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} size='icon' className={'lg:hidden'}>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className={'w-full max-w-xs'}>
            <MenuItems />
            <div className='pl-4'>  <HeaderRightContent /></div>
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'><HeaderRightContent /></div>
      </div>
    </header>
  );
}

export default ShoppingHeader
