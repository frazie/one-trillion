
import getCurrentUser from "../actions/getCurrentUser"
import Dashboard from "./page"
import { getUserTrees } from "../actions/getAllTrees"
// import getReferrals from "../actions/getReferrals"
// import ClientOnly from "../components/ClientOnly"

export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const currentUser = await getCurrentUser()
    // const referr = await getReferrals(currentUser.id)

    const Users = await getUserTrees()

    return (
        <div>
          {/* <ClientOnly> */}
            <Dashboard currentUser={currentUser} treeData={Users}  />
            {/* {children} */}
          {/* </ClientOnly> */}
            
        </div>        
    )
  }