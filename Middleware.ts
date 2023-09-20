export {default} from 'next-auth/middleware';

export const config = {

    matcher:[
        "/MyCars",
        "/reservations",
        "/favorites",
        "/rentcars"
    ]
}