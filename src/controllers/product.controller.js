import { uploadFileToStorage } from "../meobase";
import productModel from "../models/product.model"
import fs from 'fs'
export default {

    readProductById: async (req, res) => {  

        try {
            let modelRes = await productModel.readProductById(parseInt(req.params.id))
   
            res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    create: async (req, res) => {  
        let newProductFormat = JSON.parse(req.body.product_infor)
        let avatarProcess = await uploadFileToStorage(req.files[0], "products", fs.readFileSync(req.files[0].path));
        newProductFormat.avatar = avatarProcess;
        fs.unlink(req.files[0].path, (err) => {

        })
        req.files.splice(0, 1);
      

        
        try {
            let modelRes = await productModel.create(newProductFormat)
            if(modelRes){

            }
           return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },

    findAll: async function (req, res) {
        try {
            /* Find by name or des */
            if (req.query.search) {
                let modelRes = await productModel.searchByName(req.query.search)
                return res.status(modelRes.status ? 200 : 221).json(modelRes)
            }
            /* Find all */
            let modelRes = await productModel.findMany()
            return res.status(modelRes.status ? 200 : 221).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    update: async (req, res) => {

        req.body = JSON.parse(req.body.product_infor);

        // xử lý avatar
        if (req.file != undefined) {
            let url = await uploadFileToStorage(req.file, "products", fs.readFileSync(req.file.path));
            fs.unlink(req.file.path, (err) => { })
            req.body.avatar = url;
        }

        try {
            /* Gọi model xử lý database */
            let result = await productModel.update(Number(req.params.productId), req.body);
            return res.status(result.status ? 200 : 214).json(result)
            // console.log("result", result)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    }
}