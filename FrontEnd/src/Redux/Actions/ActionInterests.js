import * as IterestsAPI from '../Api/InteretApi'
export const allInterstes = async()=>{
            const resposs = await IterestsAPI.interests()
            if (resposs.data.status === "success") {
                  return resposs.data.results
            } 
 }