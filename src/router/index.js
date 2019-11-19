import Vue from "vue";
import Router from "vue-router";

import Footer from "../views/footer/Footers";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/Home"
    },
    {
      path: "/Home",
      component: Footer,
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/Home.vue")
        }
      ]
    },
    {
      path: "/Classification",
      component: Footer,
      children: [
        {
          path: "",
          name: "Classification",
          component: () =>
            import("../components/classification/Classification.vue")
        }
      ]
    },
    {
      path: "/Cart",
      component: Footer,
      children: [
        {
          path: "",
          name: "Cart",
          component: () => import("../components/Cart/Cart.vue")
        }
      ]
    },
    {
      path: "/My",
      component: Footer,
      children: [
        {
          path: "",
          name: "My",
          component: () => import("../components/My/My.vue")
        }
      ]
    },
    {
      path: "/Location",
      name: "Location",
      component: () => import("../components/Mall/Location/Location.vue")
    },
    {
      path: "/Details",
      name: "Details",
      component: () => import("../components/details/Details.vue")
    },
    {
      path: "/Signin",
      name: "Signin",
      component: () => import("../components/sign/Signin.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/sign/register.vue")
    },
    {
      path: "/Personal",
      name: "Personal",
      component: () => import("../components/My/personal/Personal.vue")
    },
    {
      path: "/Settlement",
      name: "Settlement",
      component: () => import("../components/Cart/Settlement/Settlement.vue")
    },
    {
      path: "/Address_list",
      name: "Address_list",
      component: () => import("../components/My/Addresslist/Address_list.vue")
    },
    {
      path: "/Edit_address",
      name: "Edit_address",
      component: () => import("../components/My/Addresslist/Edit_address.vue")
    },
    {
      path: "/Completed",
      name: "Completed",
      component: () => import("../components/My/Completed/Completed.vue")
    },
    {
      path: "/Collection",
      name: "Collection",
      component: () => import("../components/My/Collection/Collection.vue")
    },
    {
      path: "/Myorder",
      name: "Myorder",
      component: () => import("../components/My/Myorder/Myorder.vue")
    },
    {
      path: "/Recently",
      name: "Recently",
      component: () => import("../components/My/Recently/Recently.vue")
    },
    {
      path: "/Comment",
      name: "Comment",
      component: () => import("../components/My/comment/Comment.vue")
    },
    {
      path: "/Center",
      name: "Center",
      component: () => import("../components/My/comment/Center.vue")
    },
    {
      path: "/Commentdetails",
      name: "Commentdetails",
      component: () => import("../components/My/comment/Commentdetails.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue")
    }
  ]
});

export default router;
