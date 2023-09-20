'use client';
import Container from "../Container";
import {SiMercedes, SiBmw, SiAudi, SiToyota,SiHonda, SiHyundai, SiLamborghini, SiTesla, SiFerrari, SiPorsche, SiNissan,SiMclaren, SiBentley, SiRollsroyce, SiMaserati} from "react-icons/si"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
    {
        label: 'Benz',
        icon: SiMercedes,
        description: 'This is a Benz Branch'
    },
    {
        label: 'BMW',
        icon: SiBmw,
        description: 'This is a BMW Branch'
    },
    {
        label: 'Audi',
        icon: SiAudi,
        description: 'This is a Audi Branch'
    },
    {
        label: 'Toyota',
        icon: SiToyota,
        description: 'This is a Toyota Branch'
    },
    {
        label: 'Honda',
        icon: SiHonda,
        description: 'This is a Honda Branch'
    },
    {
        label: 'Hyundai',
        icon: SiHyundai,
        description: 'This is a Hyundai Branch'
    },
    {
        label: 'Lamborghini',
        icon: SiLamborghini,
        description: 'This is a Lamborghini Branch'
    },
    {
        label: 'Tesla',
        icon: SiTesla,
        description: 'This is a Tesla Branch'
    },
    {
        label: 'Ferrari',
        icon: SiFerrari,
        description: 'This is a Ferrari Branch'
    },
    {
        label: 'Porsche',
        icon: SiPorsche,
        description: 'This is a Porsche Branch'
    },
    {
        label: 'Nissan',
        icon: SiNissan,
        description: 'This is a Nissan Branch'
    },
    {
        label: 'Mclaren',
        icon: SiMclaren,
        description: 'This is a Mclaren Branch'
    },
    {
        label: 'Bentley',
        icon: SiBentley,
        description: 'This is a Bentley Branch'
    },
    {
        label: 'Rolls-Royce',
        icon: SiRollsroyce,
        description: 'This is a Rolls-Royce Branch'
    },
    {
        label: 'Maserati',
        icon: SiMaserati,
        description: 'This is a Maserati Branch'
    },
   
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/'
    if(!isMainPage){
        return null;
    }
    return(
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((items)=>(
                    <CategoryBox key={items.label} label={items.label} selected={category === items.label} icon={items.icon} />
                ))}
            </div>
        </Container>
    );
}
export default Categories;