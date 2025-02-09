
import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
import createToast from "../utilis/toastify";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HiAnnotation } from "react-icons/hi";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab ] = useState("");
  const dispatch = useDispatch(); 

 const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]);

    // user sign out 
    const handleUserSignout = async() => {
      try {
        const res = await fetch("/api/user/signout", {
          method : "POST"
        });
        const data = await res.json();
  
        if (!res.ok) {
          console.log(data.message);
        }else{
           dispatch(signOutSuccess());
           createToast("Sign Out SuccessFull", "success"); 
        }
      } catch (error) {
        console.log(error.message);
        
      }
    }


  return (
    <>
      <Sidebar className="w-full md:w-56">
          <Sidebar.Items> 
              <Sidebar.ItemGroup className="flex flex-col gap-1">
              {
                    currentUser.isAdmin && (
                      <Link to='/dashboard?tab=dash'>
                        <Sidebar.Item
                          active={tab === 'dash'}
                          icon={HiChartPie}
                          as='div'
                        >
                          DashBoard
                        </Sidebar.Item>
                    </Link>
                    ) 
                  }
                  <Link to="/dashboard?tab=profile" >
                    <Sidebar.Item active={tab === "profile"} icon={HiUser} label={currentUser.isAdmin ? "admin" : "user"} labelColor="dark" as="div">
                         Profile 
                     </Sidebar.Item>
                  </Link>
                  {
                    currentUser.isAdmin && (
                      <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item
                          active={tab === 'posts'}
                          icon={HiDocumentText}
                          as='div'
                        >
                          Posts
                        </Sidebar.Item>
                    </Link>
                    ) 
                  }
                
                {
                    currentUser.isAdmin && (
                      <Link to='/dashboard?tab=comments'>
                        <Sidebar.Item
                          active={tab === 'comments'}
                          icon={HiAnnotation}
                          as='div'
                        >
                          Comments
                        </Sidebar.Item>
                    </Link>
                    ) 
                  }

                  {
                    currentUser.isAdmin && (
                      <Link to='/dashboard?tab=users'>
                        <Sidebar.Item
                          active={tab === 'users'}
                          icon={HiOutlineUserGroup}
                          as='div'
                        >
                          Users
                        </Sidebar.Item>
                    </Link>
                    ) 
                  }
           
               
                  <Sidebar.Item
                      icon={HiArrowSmRight}
                      className='cursor-pointer'
                      onClick={handleUserSignout}
                    >
                    Sign Out
                </Sidebar.Item>
              </Sidebar.ItemGroup>
          </Sidebar.Items>
      </Sidebar>
    </>
  )
}

export default DashSidebar


