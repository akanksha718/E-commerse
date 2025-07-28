import CommonForm from '@/components/common/form';
import { registerformConfig } from '@/config';
import { registerUser } from '@/store/authSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
const initialState = {
    userName: "",
    email: "",
    password: "",
}
function AuthRegister() {
    const [formData, setFormData] = React.useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function onsubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast(data.payload.message);
                navigate("/auth/login");
            }
            else {
                toast(data.payload.message);
                varient :"distructive";
            };
        });
    };
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create account</h1>
            </div>
            <div>
                <CommonForm
                    formControls={registerformConfig}
                    buttonText={"Sign up"}
                    formData={formData}
                    setFormData={setFormData}
                    onsubmit={onsubmit}
                />
            </div>
            <p className='mt-2'>Already have accout?
                <Link className='font-medium ml-2 text-primery hover:underline' to="/auth/login">Login</Link></p>
        </div>
    )
}

export default AuthRegister
