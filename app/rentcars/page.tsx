import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import CarsClient from "./CarsClient";

const VisitsPage = async()=>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unavaliable" subtitle="You need to Log in" />
            </ClientOnly>
        )
    }
    const reservation = await getReservations({
    userId: currentUser.id
   });
   if(reservation.length === 0){
    return (
        <ClientOnly>
            <EmptyState title="No Reservation" subtitle="Make a visit!" />
        </ClientOnly>
    )
   }
   return (
    <ClientOnly>
        <CarsClient reservation={reservation} currentUser={currentUser} />
    </ClientOnly>
   )

}
export default VisitsPage;
