import React, { createContext, useReducer, useContext } from "react";


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      // console.log("setting user GS:  ", action.type, "state", state)
      return {
        ...state,
        currentUser: action.user,
        loading: false
      };
    case "setClasses":
      return {
        ...state,
        classes: action.classes,
        loading: false
      };
    case "setAllSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        sessions: action.sessions,
        loading: false
      };
    case "setParticipatingSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        participatingSessions: action.sessions,
        loading: false
      };
    case "setHostedSessions":
      // console.log("setting sessions state ", action.sessions)
      return {
        ...state,
        hostedSessions: action.sessions,
        loading: false
      };


    case "LOADING":
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: {
      id: "",
      firstName: "",
      lastName: "",
      image: ""
    },
    session: {
      date: Date(),
      location: "",
      host: "",
      participants: []
    },
    classes: [],
    sessions: [],
    hostedSessions: [],
    participatingSessions: [],
    


  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
