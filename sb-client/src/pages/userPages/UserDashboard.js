import React, { useEffect, useState } from "react"
import { useStoreContext } from "../../utils/GlobalState"
import API_User from "../../utils/API_User.js"
import Profile from "../../components/profilePanel/profilePanel"
import Jumbotron from "../../components/jumbotron/jumbotron"
import Main from "../../components/mainPanel/mainPanel"


const UserDashboard = props => {
    const [state, dispatch] = useStoreContext();
    const [mounted, setMounted] = useState(true);
    // const [sessions, setSession] = useState();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (mounted) {
            setMounted(false);

            console.log("Mounting")

            API_User.verifyUser().then(function (response) {
                let userObj = {
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    image: response.data.image
                }

                dispatch({ type: "setUser", user: userObj })
                // console.log(response)

                API_User.getAllClasses(response.data.id).then(classres => {
                    // console.log("coming from userdashboard - ", classres)
                    dispatch({
                        type: "setClasses",
                        classes: classres.data
                    })
                })
                API_User.getHostedSessions(response.data.id).then(resHostedSessions => {
                    dispatch({
                        type: "setHostedSessions",
                        sessions: resHostedSessions.data
                    })
                })

                API_User.getAllParticipatingSessions(response.data.id).then(resParticipatingSessions => {
                    // console.log("getting participating sessions")
                    dispatch({
                        type: "setParticipatingSessions",
                        sessions: resParticipatingSessions.data
                    })
                })
                API_User.getAllLocations().then(qresponse => {

                    // console.log(qresponse)

                    dispatch({
                        type: "setLocations",
                        locations: qresponse.data
                    })
                })

            });

           

        }


    }, [mounted, state, dispatch])
   
   
    console.log(state)

    return (
        <div>
            <div className="col-12 pb-5">
                <Jumbotron />
            </div>
            <div className="row">
                <div className="col-md-3 pt-5 px-5 text-center border-top border-right border-dark">
                    <Profile classid={state.classid} />
                </div>
             <div className="col-md-9 pt-5 border-top border-dark">
                <Main />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard