import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import MyCarsClient from "./MyCarsClient";
import getListings from "../actions/getListings";

const MyCarsPage = async()=>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unavaliable" subtitle="You need to Log in" />
            </ClientOnly>
        )
    }
    const Cars = await getListings({
    userId: currentUser.id
   });
   if(Cars.length === 0){
    return (
        <ClientOnly>
            <EmptyState title="No Cars Found" subtitle="Seems like you have not posted any cars yet" />
        </ClientOnly>
    )
   }
   return (
    <ClientOnly>
        <MyCarsClient Cars={Cars} currentUser={currentUser} />
    </ClientOnly>
   )

}
export default MyCarsPage;
