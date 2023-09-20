import prisma from "@/app/libs/prismadb";
export interface IListingParams{
    userId?: string;
    guestCount?: number;
    SeatCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params:IListingParams) {
    try {
        const {userId,guestCount,SeatCount,startDate,endDate,locationValue,category} = params;
        let query: any = {};
        if(userId){
            query.userId = userId;
        }
        if(category){
            query.category = category;
        }
        if(SeatCount){
            query.SeatCount = {
                gte: +SeatCount
            }
        }
        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }
        if(locationValue){
            query.locationValue = locationValue;
        }

        if(startDate && endDate){
            query.NOT = {
                reservations:{
                    some:{
                        OR:[{endDate:{gte:startDate}, startDate:{lte:startDate},},{startDate:{lte:endDate},endDate:{gte:endDate}}]
                    }
                }
            }
        }

        const Listings = await prisma.listing.findMany({
            
            where:query,
            orderBy:{
                createdAt:'desc'
            }
        });
       

        return Listings;
        
    } catch (error: any) {
        throw new Error(error);
        
    }
}