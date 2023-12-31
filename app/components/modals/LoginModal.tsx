'use client';
import axios from "axios";
import {BsFacebook} from 'react-icons/bs';
import { AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useCallback, useState } from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {signIn} from 'next-auth/react';
import {toast} from 'react-hot-toast';
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
const LoginModal = () =>{
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const[isLoading, setisLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
          defaultValues:{
            email:'',
            password:''
          }
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setisLoading(true);
        
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback)=>{
            setisLoading(false);
            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                LoginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }
    const toggle = useCallback(() => {


     LoginModal.onClose();
     registerModal.onOpen();
    }, [LoginModal, registerModal])
    const bodyContent = (
        <div className="flex flex-col gap-4">
         <Heading title="Welcome to Car Sale Pro" subtitle="Log in to your Account" center />
         <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
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
            Don't have an account?
            </div>
            <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
            Register
            </div>
        </div>

     </div>
        </div>
    )
    return (
       <Modal disabled ={isLoading} isOpen={LoginModal.isOpen} title="Login" actionLabel="Continue" onClose={LoginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    );
}

export default LoginModal;