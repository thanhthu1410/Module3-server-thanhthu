import categoryModel from "../models/category.model"
export default {
    readMany: async (req, res) => {
        try {
            let modelRes = await categoryModel.readMany(parseInt(req.params.categoryid))

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    findAllCategories: async (req, res) => {
        try {
            let modelRes = await categoryModel.findAll()

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    create: async (req, res) => {
        
        try {
          
            let modelRes = await categoryModel.create(req.body)

            return res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },
    readCategoryById: async (req, res) => {  

        try {
            let modelRes = await productModel.readCategoryById(parseInt(req.params.id))
   
            res.status(modelRes.status ? 200 : 214).json(modelRes)

        } catch (err) {
            return res.status(500).json(
                {
                    message: "Bad request products !"
                }
            )
        }
    },

}