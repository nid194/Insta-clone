import {SIGN_IN,SIGN_UP} from "./ActionType";

export const signinAction=(data)=>async (dispatch)=>{

    try{

        const res = await fetch("http://localhost:8080/signIn",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
              data.email.includes("@")
             ? { email: data.email, password: data.password }  // email
             : { userName: data.userName, password: data.password } // otherwise username
            )
        })
        const result = await res.json();
        console.log("signin user:", result);
       
        if (result.token) {
         localStorage.setItem("authToken", result.token);
       } 
        dispatch({ type: SIGN_IN, payload: {
            status : "success",
            token : result.token
        } });
        return result;
    }catch(error){
         console.error("Login failed:", error);
         dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
}
export const signupAction=(data)=>async (dispatch)=>{

    try{

        const res = await fetch("http://localhost:8080/signUp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)  
        })
         const user = await res.json();
         console.log("signup user:", user);
         dispatch({ type: SIGN_UP, payload: user});
    }catch(error){
         console.error("signup failed:", error);
         dispatch({ type: "SIGNUP_FAILURE", payload: error.message });
    }
}