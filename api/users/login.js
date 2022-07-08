import { User } from "../_database/models/index";
import connectToMongodb from "../_database/connect-to-mongodb";

const handler = async (request, response) => {

  try{
    await connectToMongodb();

    if(request.method === "POST"){

        const userNickName = request.body.nickName;     
        
        if(userNickName !== ""){
            const user = await User.findOne({nickName: userNickName});

            if(user != null){
                return response.status(200).json(user);
            }else{
                return response.status(501).json({message:"User no Exist"})
            }
        }        
    }

  }catch(error){
    return response.status(500).json({message:"Server Error" + error.message})
  }

};
export default handler;
