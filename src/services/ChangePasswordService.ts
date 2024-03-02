 import { ChangePassword } from "src/models/ChangePassword.model"
import apiSlice from "./ApiSlice"
import { v4 } from "uuid";
import { PasswordUpdateAdmin } from "src/models/Admin.model";

const deviceId = localStorage.getItem("deviceId") || v4();

export const changePasswordApi =apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        
        //Post-request
        changePassword :builder.mutation({
            invalidatesTags :["change-password"],
            query :(body :ChangePassword)=>({
                url :"/admin/change-password",
                headers: {
                    deviceId: deviceId,
                  },
                method :"POST",
                body,
            })
        }) ,
        // Change Password
     changeAdminPassword: builder.mutation({      
        query: ({body,id} :PasswordUpdateAdmin ) => {
          return({
            url: "/admin/change-password-admin",
            method: "POST",  
            params: { id } ,
           body
          })
        },
      }),
    })
})
export const {useChangePasswordMutation , useChangeAdminPasswordMutation} = changePasswordApi

