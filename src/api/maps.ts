import axios from "axios"
import config from '../../config.json'

const maps = axios.create({

})

export async function  getCoord(address : String){
    
    return await maps.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.GOOGLE_KEY}`);
    
}