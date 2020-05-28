import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"

const UserDashboard = props => {
    const [state, dispatch] = useStoreContext();
    const [mounted, setMounted] = useState(true);
    // const [sessions, setSession] = useState();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (mounted) {

            console.log("state is null")

            API_User.verifyUser().then(function (response) {
                let userObj = {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    image: response.data.image
                }

                dispatch({ type: "setUser", user: userObj })
                console.log(response)

                API_User.getAllClasses(response.data.id).then(classres => {
                    console.log("coming from userdashboard - ", classres)
                   
                        dispatch({
                            type: "setClasses",
                            classes: classres.data
                        })
                    
                    console.log("class array",classres.data)
                })

                API_User.getSessionsForOneClass("3").then(sessionClassResp =>{
                    console.log("getting all sessions for one class")
                    console.log(sessionClassResp)
                })


            });
            // API_User.getAllLocations().then(qresponse =>{

            // console.log(qresponse)
            // })
          
        

            setMounted(false);

        }
   

    }, [mounted, state, dispatch])
    console.log(state)

    return (
        <div>
        {/* <Jumbotron /> */}
        <h1>Hello {state.currentUser.firstName}! </h1>
        <Profile classid={state.classid} />
        <p></p>
        {/* <Main /> */}
    </div>


    )
}

export default UserDashboard