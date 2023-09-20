'use client';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}
const SearchModal = () => {
    
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useParams();
    const [step,setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [SeatCount, setSeatCount] = useState(1);
    const [location,setLocation] = useState<CountrySelectValue>();
    const [dateRange, setDateRange] = useState<Range>(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );
    const Map = useMemo(() => dynamic(()=>import('../Map'),{
         ssr:false,
    }),[location]);

    const onBack = () => {
        setStep((value) => value - 1);
    }
    const onNext = () => {
        setStep((value) => value + 1);
    }
    const onSubmit = useCallback(async()=>{
         if(step!== STEPS.INFO){
            return onNext();
         }
         
         let currentQuery = {};
         if(params){
            currentQuery = qs.parse(params.toString());
         }
         const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            SeatCount
         };
         if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate);
         }
         if(dateRange.endDate){
            updatedQuery.endDate= formatISO(dateRange.endDate);
         }
         const url = qs.stringifyUrl({
            url:'/',
            query:updatedQuery
         },{skipNull:true});
         setStep(STEPS.LOCATION);
         searchModal.onClose();
         router.push(url);
    },[step,params,searchModal,location,guestCount,SeatCount,dateRange,onNext,router]);
    const actionLabel = useMemo(()=>{
         if(step === STEPS.INFO){
            return 'Search';
         }
         return 'Next';
    },[step]);
    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION){
            return undefined;
        }
        return 'Back';
    },[step]);
    let bodyContent = (

        <div className="flex flex-col gap-8">
            <Heading title="Where are you located?" subtitle="Find the Cars in your location" />
            <CountrySelect value={location} onChange={(value)=>setLocation(value as CountrySelectValue)}  />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )
    if(step === STEPS.DATE){
        bodyContent=(
            <div className="felx flex-col gap-8">
                <Heading title="When is your prefer date to rent?" subtitle="Make sure the car is available!" />
                <Calendar value={dateRange} onChange={(value)=>setDateRange(value.selection)} />

            </div>
        )
    }
    if(step === STEPS.INFO){

        bodyContent = (
            <div className="flex flex-col gap-8">
             <Heading title="More information" subtitle="Find your Cars!" />
             <Counter title="Guests" subtitle="How many guests are coming to visit?" value={guestCount} onChange={(value)=>setGuestCount(value)} />
             <Counter title="Seats" subtitle="How many Seats do your prefer for your car?" value={SeatCount} onChange={(value)=>setSeatCount(value)} />
            </div>
        )
    }
    return (
        <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title="Filters" actionLabel={actionLabel} secondaryAction={step === STEPS.LOCATION? undefined:onBack} secondaryLabel={secondaryActionLabel} body={bodyContent} />
    )
}

export default SearchModal;