import mongoose from "mongoose";
const orderSchema = mongoose.Schema({
    item_name:{type:String,required:'Item Name is required',trim:true},
    cost:{type:Number,required:'Cost is required',trime:true},
    order_date:{type:String,required:'Order date is required',trime:true},
    delivery_date:{type:String,required:'Delivery date is required',trime:true},
})

const OrderModel = mongoose.model('orders',orderSchema)

export default OrderModel
 