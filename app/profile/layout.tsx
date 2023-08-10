import getCurrentUser from "../actions/getCurrentUser";
import Profile from "./page";
import getPlantedTrees from "../actions/getTrees";
import ClientOnly from "../components/ClientOnly";
export default async function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const currentUser = await getCurrentUser()
    const trees = await getPlantedTrees(currentUser?.id)
    return (
        <>
          <ClientOnly>
            <Profile currentUser={currentUser} trees={trees} />
          </ClientOnly>
        </>
    )
}