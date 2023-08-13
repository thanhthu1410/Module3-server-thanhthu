import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
export default {
    readProductById: async (productId) => {

        try {
           let products = await prisma.products.findMany({
            where:{
               id: productId
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
    create: async (data) => {  

        try {

            await prisma.products.create({
            data: data
           })
       
      
           return {
                status: true,
                message : "created!"
           }
        }catch(err) {

            return {
                status: false,
                message: "create failed!"
            }
        }
    },
   
    findMany: async function () {
        try {
            let products = await prisma.products.findMany({
                where:{
                    active:false
                }
            });
            return {
                status: true,
                message: "san pham duoc tim thay!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "lỗi!"
            }
        }
    },
    searchByName: async function (searchString) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: searchString,
                            }
                        },
                        {
                            des: {
                                contains: searchString,
                            },
                        }
                    ]
                }
            });
            return {
                status: true,
                message: "Ket qua search",
                data: products
            }
        } catch (err) {

            return {
                status: false,
                message: "lỗi!"
            }
        }
    },
    update: async function (productId, data) {
        try {
            const product = await prisma.products.update({
                where: {
                    id: productId
                },
                data: {
                    ...data
                }
            })
            return {
                status: true,
                message: "Update sản phẩm thành công!",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },

    
}