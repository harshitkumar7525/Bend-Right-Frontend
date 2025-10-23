import { ListScrollArea } from "./ListScrollArea.tsx";

const YogaList = () => {
  return (
    <div
      className="
        bg-black/10 dark:bg-white/10
        backdrop-blur-sm              
        rounded-xl                    
        p-6                           
        shadow-lg                     
        flex flex-col                 
        gap-6                         
        max-w-md       
        ml-auto  
        sm:w-full  
        sm:max-w-none
        sm:ml-0   
      "
    >
      <h2
        className="
          text-2xl font-bold           
          text-gray-900 dark:text-gray-100 
          text-center                   
        "
      >
        Yoga Poses
      </h2>
      <ListScrollArea />
    </div>
  );
};

export default YogaList;
