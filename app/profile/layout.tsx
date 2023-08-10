
import getCurrentUser from "../actions/getCurrentUser";
import Profile from "./page";
import getPlantedTrees from "../actions/getTrees";
import ClientOnly from "../components/ClientOnly";

export default async function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    try {
      const currentUser = await getCurrentUser();
      const treesOrNull: number | null = await getPlantedTrees(currentUser?.id);
  
      let trees: number | null = null;
      
      if (treesOrNull !== null) {
        trees = treesOrNull;
      }
  
      return (
        <ClientOnly>
          <Profile currentUser={currentUser} trees={trees} />
        </ClientOnly>
      );
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error as needed, e.g., display an error message or a loading indicator
      return <div>Error fetching user data</div>;
    }
}