'use client';

import { IconType } from "react-icons";

import { SiMclaren } from "react-icons/si";

interface ListingCategoryProps {
    icon: IconType,
    label: string;
    description: string;
}
const ListingCategory:React.FC<ListingCategoryProps> = ({
    icon:Icon,
    label,
    description
}) => {
    // const toggleIcon = () => {
    //     if(label === 'Mclaren'){
    //        return SiMclaren;
    //     }
    //     return null;
    // }
    // const icons = toggleIcon();
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-4">
              <Icon size={40} className="text-neutral-600" />
               
              <div className="flex flex-col">
                <div className="text-lg font-semibold">
                  {label}
                </div>
                <div className="text-neutral-500 font-light">
                  {description}
                </div>
              </div>

            </div>

        </div>
    )
}
export default ListingCategory;