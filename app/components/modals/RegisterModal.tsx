'use client';
import axios from "axios";
import {FcGoogle} from "react-icons/fc";

import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {toast} from 'react-hot-toast';
import Button from "../Button";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () =>{
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const[isLoading, setisLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
          defaultValues:{
            name:'',
            email:'',
            password:''
          }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setisLoading(true);
        axios.post('/api/register', data).then(()=>{
            registerModal.onClose();
        }).catch((error)=>{
            toast.error("Something is not going right");
            console.log(error);
        }).finally(()=>{
            setisLoading(false);
        })
    }

    const Toggle = useCallback(()=>{
      registerModal.onClose();
      LoginModal.onOpen();
    },[registerModal, LoginModal]) 
    const bodyContent = (
        <div className="flex flex-col gap-4">
         <Heading title="Welcome to Car Sale Pro" subtitle="Create an Account" center />
         <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
         <Input id="name" label="UserName" disabled={isLoading} register={register} errors={errors} required />
         <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
     <hr />
     <Button label="Continue with Google" outline icon={FcGoogle} onClick={()=>signIn('google')} />
     
     <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
            <div >
            Already have an account?
            </div>
            <div onClick={Toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Log in
            </div>
        </div>

     </div>
        </div>
    )
    return (
       <Modal disabled ={isLoading} isOpen={registerModal.isOpen} title="Register" actionLabel="Continue" onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
}

export default RegisterModal;