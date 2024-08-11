import express from "express";
import { bannerInvisible, bannerVisible, createBanner, getAllBanner, getVisibleBanner, updateBanner } from "../controller/bannerController.js";

const bannerRouter=express();

bannerRouter.get("/get-banners",getAllBanner)
bannerRouter.post("/create-banner",createBanner);
bannerRouter.put("/update-banner/:id",updateBanner)
bannerRouter.put("/invisible-banner/:id",bannerInvisible);
bannerRouter.put("/visible-banner/:id",bannerVisible)
bannerRouter.get("/get-visible-banners",getVisibleBanner)



export default bannerRouter