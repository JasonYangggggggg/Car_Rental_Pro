'use client';
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser, safeReservations } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface CarsClientProps{
    reservation: safeReservations[];
    currentUser?: SafeUser | null;
}
const CarsClient:React.FC<CarsClientProps> = ({
    reservation,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
          setDeletingId(id);
          axios.delete(`/api/reservations/${id}`).then(() => {
            toast.success("It is Deleted");
            router.refresh();
          }).catch(()=> {
            toast.error("Something happened");
          }).finally(()=>{
            setDeletingId('');
          });

    },[router]);
    return (
        <Container>
            <Heading title="Rent Cars" subtitle="What cars you have rent and what car you are going to drive!" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
             {reservation.map((reservation)=>(
                <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} OnAction={onCancel} disabled={deletingId === reservation.id} actionLabel="Delete Reservation" currentUser={currentUser} />
             ))}
            </div>
        </Container>
    )
}

export default CarsClient;