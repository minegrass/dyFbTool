import axios from "axios";
import { convertInput } from "./convertInput";
require("dotenv").config();
import { getVidUrlFromUrl } from "./getVidUrlFromUrl";
const { PAGE_ID, PAGE_TOKEN } = process.env;

export const postLongVid = async (userInput:string)=>{
    const link = convertInput(userInput)
    if (link){
    const videoUrl = await getVidUrlFromUrl(link)
    if(videoUrl && videoUrl.link){
    const uploadBinaryResponse = await axios.post(`https://graph-video.facebook.com/v15.0/${PAGE_ID}/videos?access_token=${PAGE_TOKEN}&file_url=${videoUrl.link}`)
    const videoId = uploadBinaryResponse.data.id;
    if (videoId) {
        return {status:true,id:videoId}

    }else{
        return {status:false,error:"Failed to upload"}
    }

}else{
    return {status:false,error:"Failed to get video Url"}
}}else{
    return {status:false,error:"Failed to get link"}
}}