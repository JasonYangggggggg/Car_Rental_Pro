'use client';
import useResModal from "@/app/hooks/useResModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";



enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const ResModal = () => {
    const loginModal = useLoginModal();
    const resModal = useResModal();
    const [step,setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
   
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{category:'', location: null, guestCount:1, SeatCount:1,imageSrc:'',price:1, title: '', description:''}
    });
    const category = watch('category');
    const location = watch('location');
    const visitorCount = watch('guestCount');
    const seatCount = watch('SeatCount');
    const imageSrc = watch('imageSrc');
    const Map = useMemo(() => dynamic(()=>import ('../Map'),{ssr:false}),[location]);
    const setCustomValue = (id: string, value: any) => {
        setValue(id,value,{
            shouldDirty:true,
            shouldTouch:true,
            shouldValidate:true
        })
    }
    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }

    // const onSubmit:SubmitHandler<FieldValues> = (data) => {
    //     if(step !== STEPS.PRICE){
    //         return onNext();
    //     }
    //     setIsLoading(true);
    //     axios.post('/api/listings',data).then(()=> {toast.success('Car Listing Created!'); router.refresh(); reset(); setStep(STEPS.CATEGORY); resModal.onClose();}).catch(()=> {
    //         toast.error("Something went wrong.");
    //     }).finally(() =>{
    //         setIsLoading(false);
    //     })
    // }
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
          return onNext();
        }
        
        setIsLoading(true);
    
        axios.post('/api/listings', data)
        .then(() => {
          toast.success('Car Listing created!');
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY)
          resModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }


    const actionLabel = useMemo(()=>{
     if(step === STEPS.PRICE){
        return 'Create';
     }
     return 'Next';
    },[step]);

    const secondaryactionLabel = useMemo(()=>{
        if(step === STEPS.CATEGORY){
           return undefined;
        }
        return 'Back';
       },[step]);
    
       let bodyContent = (
        <div className="flex flex-col gap-8">
         <Heading title="Which of these best describe your car branch?" subtitle="Pick a category" />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">{categories.map((items)=>(<div key={items.label} className="col-span-1"><CategoryInput onClick={(category) => setCustomValue('category',category)} selected={category === items.label} label={items.label} icon={items.icon} /></div>))}</div>
        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your car located?" subtitle="Help guests find you!" />
                <CountrySelect value={location} onChange={(value) => setCustomValue('location',value)} />
                <Map center={location?.latlng} />
            </div>
        )
    }
   
     if(step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your car" subtitle="What features does the car have?" />
                <Counter title="Visitors" subtitle="How many visitors do you allow?" value={visitorCount} onChange={(value)=> setCustomValue('guestCount',value)}  />
                <hr />
                <Counter title="Seats" subtitle="How many seats is the car have?" value={seatCount} onChange={(value)=> setCustomValue('SeatCount',value)}  />
                <hr />
            </div>
        )
     }
     if(step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a Photo of your car" subtitle="Show visitors what your car looks like!" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        )
     }
     if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading title="How would you describe this car?" subtitle="Short and Simple is fine!" />
              <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
              <hr />
              <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
            </div>
        )
     }

     if(step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Set the Price of your car!" subtitle="How much is your car?" />
                <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required />

            </div>
        )
     }

    return (
        <Modal disabled={isLoading} isOpen={resModal.isOpen} onClose={resModal.onClose} onSubmit={handleSubmit(onSubmit)} actionLabel={actionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} secondaryLabel={secondaryactionLabel} title="Create Car Posting" body={bodyContent}  />
    )
}

export default ResModal;