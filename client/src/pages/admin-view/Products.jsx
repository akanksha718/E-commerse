import ProductimageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts
} from '@/store/admin/products-slice'
import { React, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const intialFormData = {
  image: null,
  title: "",
  description: "",
  brand: '',
  price: "",
  salePrice: "",
  totalStock: "",
}

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(intialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.adminProducts);

  function onsubmit(event) {
    event.preventDefault();
    currentEditedId !== null ? dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setFormData(intialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    }) :
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts);
          setImageFile(null);
          setFormData(intialFormData);
          toast("Product added successfully");
        }
      });
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    })
  }
  function isFormValid() {
    return Object.keys(formData)
      .map(key => formData[key] !== '')
      .every(item => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Products</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList && productList.length > 0 ?
            productList.map((productItem) =>
              <AdminProductTile key={productItem._id} handleDelete={handleDelete} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={productItem} />) : null
        }
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => { setOpenCreateProductsDialog(false); setCurrentEditedId(null); setFormData(intialFormData) }}>
        <SheetContent side='right' className={'overflow-auto'}>
          <SheetHeader>
            <SheetTitle>{
              currentEditedId !== null ? 'Edit Product' : 'Add New Product'
            }</SheetTitle>
          </SheetHeader>
          <div className='p-2 m-2 flex flex-col gap-1'>
            <ProductimageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null} />
            <CommonForm isBtnDisabled={!isFormValid()} onsubmit={onsubmit} formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? 'Edit' : 'Add'} />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts
