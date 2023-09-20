import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getFavoriteCars() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }
        const favorite = await prisma.listing.findMany({
            where:{
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });
        const safeFavorite = favorite.map((favorite)=> ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));
        return safeFavorite;
    } catch (error:any) {
        
        throw new Error(error);
    }
}
