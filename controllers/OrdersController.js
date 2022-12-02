import Order from "../models/Order.js";
import mongoose from "mongoose";
class OrderController {

   //list order 
  static getOrders = async (req, res) => {
    try {
      let { order_date } = req.body;
      if (!order_date) {
        throw "Order date is required";
      }
      let formatted = new Date(order_date);
      if (formatted == "Invalid Date") {
        throw "The Date is invalid";
      }
      let orders = await Order.find({ order_date: order_date });
      if (orders.length==0) {
        return res.status(404).send({ msg: "No Orders Found!" });
      }
      res.status(200).json({ orders: orders });
    } catch (error) {
      res.status(400).send({ errors: error });
    }
  };

  //create order
  static addOrder = async (req, res) => {
    try {
      const { item_name, cost, order_date, delivery_date } = req.body;

      let order = await new Order({
        item_name: item_name,
        cost: cost,
        order_date: order_date,
        delivery_date: delivery_date,
      });
      await order.save();
      res.status(200).json({msg:"Order Added Successfully"});
    } catch (error) {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.send({ errors: errors });
    }
  };

 //search order with id 
  static searchOrder = async (req, res) => {
    try {
      const ObjectId = mongoose.Types.ObjectId;
      const { order_id } = req.body;
      if (!order_id) {
        throw "OrderID is required";
      }
      if (ObjectId.isValid(order_id) == false) {
        throw "Id is invalid";
      }
      let order = await Order.findOne({ _id: order_id });
      if (!order) {
        return res.status(404).send({ msg: "No Orders Found!" });
      }
      res.status(200).json({ order: order });
    } catch (error) {
        console.log(error)
      res.status(400).send({ error: error });
    }
  };

  static updateOrder = async (req,res) =>{
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const { order_id,delivery_date } = req.body;
        if (!order_id) {
          throw "OrderID is required";
        }
        if (ObjectId.isValid(order_id) == false) {
          throw "Id is invalid";
        }
        if (!delivery_date) {
            throw "Delivery date is required";
          }

          let formatted = new Date(delivery_date);
          if (formatted == "Invalid Date") {
            throw "Delivery Date is invalid";
          }
        let update = await Order.findOneAndUpdate({_id:order_id},{delivery_date:delivery_date})
        if(!update){
            throw('Couldn\'t update! no order matched')
        }
        res.status(200).json({msg:'Order Updated Successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error });
    }
  }

  //delete order
  static deleteOrder = async (req, res) => {
    try {
      const ObjectId = mongoose.Types.ObjectId;
      const { order_id } = req.body;
      if (!order_id) {
        throw "OrderID is required";
      }
      if (ObjectId.isValid(order_id) == false) {
        throw "Id is invalid";
      }
      let del = await Order.findOneAndDelete({_id:order_id})
      if(!del){
        throw('No order id is matched')
      }
      res.status(200).json({msg:'Order Deleted Successfully'});
    } catch (error) {
      res.status(400).send({ error: error });
    }
  };
}

export default OrderController;
