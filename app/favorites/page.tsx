import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";

import getFavoriteCars from "../actions/getFavoriteCars";
import FavoriteClients from "./FavoriteClients";




const ListingPage = async() => {
    const currentUser = await getCurrentUser();
    const favCars = await getFavoriteCars();
   
    if(!currentUser){
        return (
            <EmptyState title="Log in required" subtitle="You need to log in first" />
        )
    }
    if(favCars.length === 0){
    return (
        <ClientOnly>
            <EmptyState title="No favorites found" subtitle="You have not like any cars yet" />
        </ClientOnly>
    )
    }
    return (
        <ClientOnly>
            <FavoriteClients cars={favCars} currentUser={currentUser} />
        </ClientOnly>
    )
    
}
export default ListingPage;