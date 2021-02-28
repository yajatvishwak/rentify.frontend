import Home from "./routes/Home.svelte";
import Login from "./routes/Login.svelte";
import Service from "./routes/Service.svelte";
import Category from "./routes/Category.svelte";
import Detail from "./routes/Detail.svelte";
import SpecificCategory from "./routes/SpecificCategory.svelte";
import ChatRoom from "./routes/ChatRoom.svelte";
import Chat from "./routes/Chat.svelte";
import User from "./routes/User.svelte";
import Signup from "./routes/Signup.svelte";
import Notification from "./routes/Notification.svelte";
import AddItem from "./routes/AddItem.svelte";

export default {
  "/": Home,
  "/login": Login,
  "/signup": Signup,
  "/service": Service, // will list all services
  "/service/all": Category, // all category of services
  "/service/:category": SpecificCategory, // specific category of services
  "/service/detail/:id": Detail, //deatils of a service
  "/chatroom": ChatRoom, //chat room
  "/user": User, // user profile
  "/chatroom/:id": Chat, // chat box
  "/notification": Notification, // Notification
  "/insertItem": AddItem,
};
