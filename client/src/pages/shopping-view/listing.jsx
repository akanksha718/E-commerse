import ProductFilter from '@/components/Shopping-view/filter'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import { ArrowUpDownIcon } from 'lucide-react'
import { DropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu'
import { sortOptions } from '@/config'
import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingProductTile from '@/components/Shopping-view/product-tile'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from '@/components/Shopping-view/product-details'
import { addToCart, fetchCartItems } from '@/store/shop/cart-Slice'
import { toast } from 'sonner'

function createSearchParamsHelper(filtersParams) {
  const querryParams = [];
  for (const [key, value] of Object.entries(filtersParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      querryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return querryParams.join('&');
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList, productDetail } = useSelector(state => state.shopProducts)
  const { user } = useSelector(state => state.auth);
  const [filters, setFileters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailDialog] = useState(false);
  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const inedexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (inedexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }

    }
    setFileters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast("Product is added to cart");
      }
    });
  }
  

  useEffect(() => {
    setSort("price-lowtohigh");
    setFileters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])


  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuerryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQuerryString));
    }
  }, [filters])

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (productDetail !== null) setOpenDetailDialog(true);
  }, [productDetail])
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 flex items-center justify-between'>
          <h2 className='text-lg font-extrabold '>All Products</h2>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground'>{productList?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'sm'} className={'flex items-center gap-1'}>
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className={'w-[200px]'}>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
              productList.map(productItem => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddToCart={handleAddToCart} />) : null
          }
        </div>
      </div>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailDialog} productDetails={productDetail} />
    </div>
  );
}

export default ShoppingListing
