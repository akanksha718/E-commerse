import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { File, X,CloudUpload  } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';

const ProductimageUpload = ({ file, setFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, imageLoadingState, isEditMode }) => {
    const inputRef = useRef(null);
    function handleDragOver(event) {
        event.preventDefault();
    }
    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    }
    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile);
    }
    function handleRemoveImage() {
        setFile(null);
        if (inputRef.current) { inputRef.current.value = ""; }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', file);
        try {
            const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data);
            if (response.data?.success) {
                setUploadedImageUrl(response.data.result.url);
            } else {
                console.error('Upload failed', response.data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (file !== null) {
            uploadImageToCloudinary();
        }
    }, [file])
    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? "opacity-60" : null} opborder-2 border-dashed rounded-lg p-4 mb-1`}>
                <Input id='image-upload' className={'hidden'} type="file" ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode} />
                {
                    !file ?
                        <Label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed" : "null"}flex flex-col items-center justify-center h-32 cursor-pointer`}>
                            <CloudUpload className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & drop or Click to upload image</span>

                        </Label> :
                        (imageLoadingState ? <Skeleton className=' h-10  bg-gray-100' /> : (
                            <div className='flex  items-center justify-between'>
                                <div className='flex items-center'>
                                    <File className='w-8 text-primary h-8 mr-2' />
                                </div>
                                <p className='text-sm font-medium'>{file.name}</p>
                                <Button onClick={handleRemoveImage} variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground'>
                                    <X className='w-4 h-4' />
                                    <span className='sr-only'>Remove Image</span>
                                </Button>
                            </div>
                        )
                        )
                }
            </div>
        </div>
    )
}

export default ProductimageUpload
