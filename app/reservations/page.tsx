import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Not available" subtitle="You need to log in first" />
            </ClientOnly>
        );
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    });
    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState title="No Reservations found" subtitle="You have no reservations on your car" />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
};

export default ReservationsPage;