
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState ={
    cart : localStorage.getItem("cart") ?
          JSON.parse(localStorage.getItem("cart")): [],

    total: localStorage.getItem("total") ?
    JSON.parse(localStorage.getItem("total")):0,

    totalItems : localStorage.getItem("totalItems") ?
                 JSON.parse(localStorage.getItem("totalItems")):0,
}

export const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart:(state,action)=>{
            const course = action.payload

            const index = state.cart.findIndex((item)=> item._id === course._id)

            //check course is present or not
            if(index >= 0){
                //course present the return 
                toast.error("Course is already in Cart")
                return;
            }
          // add course in the cart
            state.cart.push(course);
          // incrementing price and totalitems
            state.total += course.price
            state.totalItems=state.cart.length

            //update the local starage

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

            toast.success("Course added successfully");

        },
        removeFromCart:(state,action)=>{
          const courseId = action.payload;

          const index = state.cart.findIndex((item)=> item._id === courseId);

          // if the course is found then remove
          if(index >= 0){
            
            state.total = state.total - state.cart[index].price;
            state.cart.splice(index,1);
            state.totalItems=state.cart.length;
          }
          //update localstorage
          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem("total",JSON.stringify(state.total));
          localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

          toast.success("Course removed successfully");
        },

        resetCart:(state) =>{
            state.cart=[]
            state.total=0
            state.totalItems=0

            // update localstorage

            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const { addToCart,removeFromCart,resetCart} = cartSlice.actions
export default cartSlice.reducer