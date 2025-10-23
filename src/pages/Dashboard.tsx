import WelcomeUserCard from "@/components/WelcomeUserCard";
import YogaList from "@/components/YogaList";
import PastData from "@/components/PastData";

const Dashboard = () => {
  return (
    <main className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 row-span-2">
        <WelcomeUserCard />
      </div>
      <div className="lg:col-span-1 lg:row-span-2 m-0">
        <YogaList />
      </div>
      <div className="lg:col-span-3 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-2 md:p-4">
        <PastData />
      </div>
    </main>
  );
};

export default Dashboard;
