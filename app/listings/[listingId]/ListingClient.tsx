'use client';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeReservations } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key:'selection'

};

interface ListingClientProps {
    reservations?:safeReservations[];
    listing: Listing & {
        user:SafeUser
    };
    currentUser?: SafeUser | null;
}
const ListingClient:React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disableDates = useMemo(() => {

        let dates: Date[] = [];
        reservations.forEach((reservation)=>{
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates = [...dates, ...range];
        });

        return dates;
    },[reservations]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const CreateReservation = useCallback(()=> {
        if(!currentUser){
            return loginModal.onOpen();
        }

        setIsLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate:dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success("Done!")
            setDateRange(initialDateRange);
            router.push('/rentcars');
            router.refresh();
        }).catch(()=>{
            toast.error("Something is not going right!");
        }).finally(() => {
            setIsLoading(false);
        })
    },[currentUser, loginModal,dateRange, totalPrice, listing?.id, router]);


    useEffect(()=> {
      if(dateRange.startDate && dateRange.endDate){
        const count = differenceInCalendarDays(dateRange.endDate,dateRange.startDate);
        if(count && listing.price){
            setTotalPrice(count * listing.price);
        }
        else{
            setTotalPrice(listing.price);
        }
      }
      
    },[dateRange,listing.price]);
    const category = useMemo(() => {
        return categories.find((item) => 
            item.label === listing.category
        );

    },[listing.category]);
    return (
        <Container>
            <div>
                <div className="flex flex-col gap-6">
                  <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />

                  <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo user={listing.user} category={category} description={listing.description} SeatCount={listing.SeatCount} guestCount={listing.guestCount} locationValue={listing.locationValue}  />
                   <div className="order-first mb-10 md:order-last md:col-span-3">
                     <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={(value) => setDateRange(value)} dateRange={dateRange} onSubmit={CreateReservation} disabled={isLoading} disabledDates={disableDates} />
                   </div>
                  </div>
                </div>
            </div>
        </Container>
    )
}
export default ListingClient;