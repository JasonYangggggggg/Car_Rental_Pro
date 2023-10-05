import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";
import { Listing } from "@prisma/client";


interface FavoriteClientsProps {
    cars: Listing[];
    currentUser?: SafeUser | null;
}

const FavoriteClients:React.FC<FavoriteClientsProps> = ({
    cars,
    currentUser
}) => {
    return (
        <Container>
             <Heading title="Favorites" subtitle="List of cars you have favorited!" />
             <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {cars.map((cars) => (
                    <ListingCard currentUser={currentUser} key={cars.id} data={cars} />
                ))}

             </div>
        </Container>
       
    )
}
export default FavoriteClients;
