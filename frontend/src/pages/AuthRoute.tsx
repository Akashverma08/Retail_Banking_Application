import {Navigate} from "react-router";

export default function AuthRoute(props:{children:React.ReactElement}){

    const {children}=props;

    const token=localStorage.getItem("accessToken");
    const role=localStorage.getItem("role");

    if(token && role==="Admin" ){
        return <Navigate to="/users" replace/>

    }else if(token && role==="Customer"){
        return <Navigate to="/customerDashboard" replace/>
    }

    return children;

}