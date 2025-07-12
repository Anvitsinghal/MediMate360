const { setMedicines } = require("@/Redux/medicineSlice");
const { default: axios } = require("axios");
const { useEffect } = require("react");
const { useDispatch } = require("react-redux")

const getallmedcines=()=>{
   const dispatch =useDispatch();
   useEffect(()=>{
    const fetallmediecines=async ()=>{
        try {
            const res=await axios.get('http://localhost:8000/medicine/medicineinfo',{
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setMedicines(res.data.medicines));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetallmediecines();
   },[])
}
export default getallmedcines;