'use client';
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser, safeReservations } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface MyCarsClientProps{
    Cars: SafeListing[];
    currentUser?: SafeUser | null;
}
const MyCarsClient:React.FC<MyCarsClientProps> = ({
    Cars,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
          setDeletingId(id);
          axios.delete(`/api/listings/${id}`).then(() => {
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
            <Heading title="Your Cars" subtitle="List of your posted Cars" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
             {Cars.map((Cars)=>(
                <ListingCard key={Cars.id} data={Cars} actionId={Cars.id} OnAction={onCancel} disabled={deletingId === Cars.id} actionLabel="Delete Your Cars" currentUser={currentUser} />
             ))}
            </div>
        </Container>
    )
}

export default MyCarsClient;