const User = require("../models/userSchema")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecretKey = "aswathy1234"

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, msg: "Invalid email format" });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({ success: false, msg: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, msg: "User created successfully", user: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "An error occurred" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid email or password" });
        }

        const authToken = jwt.sign({ user: user._id }, jwtSecretKey);
        res.status(200).json({ success: true, authToken, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "An error occurred" });
    }
};

const addToCart = async (req, res) => {
        const { userId, product } = req.body;
        try {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            const isCarted = user.cart.some(cartedProduct => cartedProduct.product._id.toString() === product._id);
            if (!isCarted) {
                user.cart.push({ product });
                await user.save();
                return res.status(200).json({ msg: 'Item added to cart successfully' });
            } else {
                return res.status(409).json({ msg: 'Item already in cart' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
}

const addToLike = async (req, res) => {
    const { userId, product } = req.body;
    // console.log("request received:", userId, product);

    try {
        const user = await User.findOne({ _id: userId });
        // console.log("user", user);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the product is already liked
        const isLiked = user.like.some(likedProduct => likedProduct.product._id.toString() === product._id);

        // console.log("liked", isLiked);

        if (!isLiked) {
            // If not liked, add to liked list
            user.like.push({ product });
            await user.save();
            return res.status(200).json({ msg: 'Item added to wishlist successfully' });
        } else {
            return res.status(409).json({ msg: 'Item already in wishlist' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const removeFromLike = async (req, res) => {
    const { userId, productId } = req.body;

    console.log("remove",req.body);

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Remove the product from liked list
        user.like = user.like.filter(likedProduct => likedProduct.product && likedProduct.product._id.toString() !== productId);

        await user.save();
        return res.status(200).json({ msg: 'Item removed from wishlist successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    console.log("remove",req.body);

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        user.cart = user.cart.filter(cartedProduct => cartedProduct.product && cartedProduct.product._id.toString() !== productId);

        await user.save();
        return res.status(200).json({ msg: 'Item removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const getCartItems = async (req, res) => {
    try {
        const userId = req.body.userId

        const user = await User.findOne({ _id: userId })
        console.log(userId, user);
        let userCart = user.cart
        if (user) {
            res.status(200).send({ userCart })
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error);
    }
}
const getLikeItems = async (req, res) => {
    try {
        const userId = req.body.userId

        const user = await User.findOne({ _id: userId })
        console.log(userId, user);
        let userLike = user.like
        if (user) {
            res.status(200).send({ userLike })
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error);
    }
}
const getUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.json(users); // Send users as JSON response
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
const banUser = async (req, res) => {
    const { userId, isBanned } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { banned: isBanned },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      res.status(200).json({ msg: `User ${isBanned ? 'banned' : 'unbanned'} successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  const addOrder = async (req, res) => {
    const { userId, totalAmount } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      if (!user.cart || user.cart.length === 0) {
        return res.status(400).json({ msg: "No items in cart" });
      }
  
      const newOrder = {
        products: user.cart.map(item => ({
          product: item.product,
          qty: item.qty,
          orderDate: new Date(),
          arrivalDate: new Date(new Date().setDate(new Date().getDate() + 7))
        })), 
        totalAmount,
        orderDate: new Date(),
        status: "Pending"
      };
  
      user.order.push(newOrder);
      user.cart = []; 
  
      await user.save();
      return res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const getOrders = async (req, res) => {
    // const userId = req.query.userId;
  
    // if (!userId) {
    //   return res.status(400).json({ error: "User ID is required" });
    // }
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    try {
      const user = await User.findById(userId);
      if (user) {
        return res.status(200).json({ orders: user.order });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
module.exports = {
    createUser,
    loginUser,
    removeFromLike,
    removeFromCart,
    addToCart,
    getCartItems,
    addToLike,
    getLikeItems,
    banUser,
    getUsers,
    getOrders,
    addOrder
}