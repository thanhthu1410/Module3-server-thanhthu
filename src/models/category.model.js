import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default {
    readMany: async (category_id) => {
        try {
           let products = await prisma.products.findMany({
            where:{
                category_id : category_id
            }
           })
           return {
                status: true,
                message : "get product category thanh cong",
                data: products
           }
        }catch(err) {
            return {
                status: false,
                message: "get product category that bai"
            }
        }
    },
    findAll: async () => {
        try {
           let categories = await prisma.categories.findMany()
           return {
                status: true,
                message : "get all product thanh cong",
                data: categories
           }
        }catch(err) {

            return {
                status: false,
                message: "get all product that bai"
            }
        }
    },
    create: async (newCategory) => {
        try {
           let categories = await prisma.categories.create({
            data:
                newCategory
    
           })
           return {
                status: true,
                message : "create category successfull!",
                data: categories
           }
        }catch(err) {
            return {
                status: false,
                message: "create category failed"
            }
        }
    },
    readCategoryById: async (categoryId) => {

        try {
           let products = await prisma.categories.findMany({
            where:{
               id: categoryId
            }
           })
      
           return {
                status: true,
                message : "get product by id thanh cong",
                data: products
           }
        }catch(err) {
            return {
                status: false,
                message: "get product by id that bai"
            }
        }
    },
}