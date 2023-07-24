import getCurrentUser from "../actions/getCurrentUser"
import Dashboard from "./page"



export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const currentUser = await getCurrentUser()

    return (
        <div>
            <Dashboard currentUser={currentUser} />
            {/* {children} */}
        </div>        
    )
  }