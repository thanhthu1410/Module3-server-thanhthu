import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default {
    addToCart: async function(user_id,cart_detail_record) {
        try {
            let userCart = await prisma.carts.findUnique({
                where: {
                    user_id
                }
            })
            if(userCart) {
                /* Đã có giỏ hàng */
                let existRecord =  await prisma.cart_details.findMany({
                    where: {
                        AND: [
                            {
                                cart_id: userCart.id
                            },
                            {
                                product_id: Number(cart_detail_record.product_id)
                            }
                        ]
                    }
                })

                if(existRecord.length != 0) {
                    // sản phẩm đã tồn tại trong carts
                const dataExist =  await prisma.cart_details.update({
                        where: {
                            id: existRecord[0].id
                        },
                        data: {
                            quantity: (cart_detail_record.quantity + existRecord[0].quantity),
                            note: cart_detail_record.note
                        },
                        include:{
                            product: true
                        }
                    })

                    return {
                        status: true,
                        message: "Add to cart successfull !",
                        data : dataExist
                    }
                }else {
                    // chưa từng
                const dataNew =  await prisma.cart_details.create({
                        data: {
                            ...cart_detail_record,
                            cart_id: userCart.id
                        },
                        include:{
                            product: true
                        }
                    })

                    return {
                        status: true,
                        message: "Add To Cart Successfull!",
                        data: dataNew
                    }
                }
            }else {
                /* Không có giỏ hàng */
                const dataNewCart = await prisma.carts.create({
                    data: {
                      user_id: user_id,
                      cart_details: {
                        create: [
                            cart_detail_record
                        ]
                      },
                    }
                })

                const dataReturn = await prisma.cart_details.findMany({
                    where: {
                        cart_id: dataNewCart.id
                    }
                })

                return {
                    status: true,
                    message: "Add To Cart Successfull!",
                    data: dataReturn[0]
                }

            }
        }catch(err) {

            return {
                status: false,
                message: "Lỗi!"
            }
        }
    },
    findCart: async function(user_id){
        try{
            let userCart = await prisma.carts.findUnique({
                where: {
                    user_id
                },
                include:{
                    cart_details :true,
                    cart_details: {
                        include:{
                            product: true
                        }
                    }
                }
            })

            return {
                status: true,
                message: "Lay gio hang thanh cong!",
                data:  userCart? userCart : null
            }

        }catch(err){

            return {
                status: false,
                message: "Lay gio hang that bai!"
            }


        }
    },
    deleteProduct: async function(product_id){
        try{
            let cartBeforeDele = await prisma.cart_details.delete({
                where: {
                    id : product_id
                }
                
            })
            return {
                status: true,
                message: "Delete Successfull!",
                data: cartBeforeDele
            }

        }catch(err){

            return {
                status: false,
                message: "Delete Failed!"
            }


        }
    },
    updateCart: async function(data){
        //0 delete , 1 increase,2 decrease
        try{ 
            
            if (data.type) {
                await prisma.cart_details.update({
                    where: {
                        id: data.cart_detail_record_edited.id
                    },
                    data: {
                        quantity: data.cart_detail_record_edited.quantity
                    }
                })
            } else {
                await prisma.cart_details.delete({
                    where: {
                        id: data.cart_detail_record_edited.id
                    }
                })
            }
            return {
                status:true,
                message:'Updated Successfully'
            }
        }catch(err){

                return{
                    status:false,
                    message:"Update Cart failed"
                }
        }
    },
    createReceipt: async function (data) {
        try {
            let receipt = prisma.receipts.create({
                data: {
                    ...data.receiptInfor,
                    receipt_details: {
                        create: data.receiptDetails
                    },
                }
            })

            const deleteCartDetail = prisma.cart_details.deleteMany({
                where: {
                    cart_id: data.receiptInfor.receipt_code
                }
            })

            const deleteCart = prisma.carts.delete({
                where: {
                    id: data.receiptInfor.receipt_code,
                },
            })

            const transaction = await prisma.$transaction([receipt, deleteCartDetail, deleteCart])

            return {
                status: true,
                message: "Ok nhé",
                data: receipt
            }
        } catch (err) {
            console.log("lỗi createReceipt", err)
            return {
                status: false,
                message: "lỗi createReceipt model"
            }
        }
    }
}