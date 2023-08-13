import purchaseModel from "../models/purchase.model";
import CryptoJS from 'crypto-js'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'


export default {
    addToCart: async function(req, res) {
        try {
            let modelRes = await purchaseModel.addToCart(Number(req.params.user_id), req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    findCart: async function(req, res) {
        try {
            let modelRes = await purchaseModel.findCart(Number(req.params.user_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    deleteProduct: async function(req, res) {

        try {
            let modelRes = await purchaseModel.deleteProduct(Number(req.params.product_id));
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
     updateCart: async function(req, res) {

        try {
            let modelRes = await purchaseModel.updateCart(req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        }catch(err) {
            return res.status(500).json({
                message: "Lỗi xử lý!"
            })
        }
    },
    createReceipt: async function (req, res) {
        try {
            let modelRes = await purchaseModel.createReceipt(req.body);
            return res.status(modelRes.status ? 200 : 213).json(modelRes)
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller createReceipt!"
            })
        }
    },
    zaloCreate: async function (req, res) {
        /*
            req.body = {
                receiptCode:"abcde",
                receiptTotal:98764,
                userName: "abc"
            }
        */console.log("req.body nekk",req.body);
        const config = {
            appid: process.env.ZALO_APPID,
            key1: process.env.ZALO_KEY1,
            key2: process.env.ZALO_KEY2,
            create: process.env.ZALO_CREATE_URL,
            confirm: process.env.ZALO_COFIRM_URL,
        };

        const orderInfo = {
            appid: config.appid,
            apptransid: `${moment().format('YYMMDD')}_${Date.now()}_${req.body.receiptCode}`,
            appuser: req.body.userName,
            apptime: Date.now(),
            item: JSON.stringify([]),
            embeddata: JSON.stringify({
                merchantinfo: "GongChaStore" // key require merchantinfo
            }),
            amount: Number(req.body.receiptTotal),
            description: "Gong Cha",
            bankcode: "zalopayapp",
        };

        const data = config.appid + "|" + orderInfo.apptransid + "|" + orderInfo.appuser + "|" + orderInfo.amount + "|" + orderInfo.apptime + "|" + orderInfo.embeddata + "|" + orderInfo.item;
        orderInfo.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        axios.post(config.create, null, { params: orderInfo })
            .then(zaloRes => {
                console.log("zaloRes",zaloRes);
                let qrCodeUrl = {
                    url: zaloRes.data.orderurl,
                    orderId: orderInfo.apptransid
                }
                console.log("qr",qrCodeUrl)
                return res.status(200).json(qrCodeUrl);
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Zalo sập!"
                });
            });
    },
    zaloCheck: async function (req, res) {
        const config = {
            appid: process.env.ZALO_APPID,
            key1: process.env.ZALO_KEY1,
            key2: process.env.ZALO_KEY2,
            create: process.env.ZALO_CREATE_URL,
            confirm: process.env.ZALO_COFIRM_URL,
        };

        let postData = {
            appid: config.appid,
            apptransid: req.params.tradeId  //"230812_1691831971847_129f517f-0105-4a3e-8102-69bd25994b3f"
        }

        let data = config.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


        let postConfig = {
            method: 'post',
            url: config.confirm,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            data: qs.stringify(postData)
        };

        axios(postConfig)
            .then(function (resZalo) {
                //console.log("response.data", res.data);
                return res.status(resZalo.data.returncode == 1 ? 200 : 213).json({
                    message: resZalo.data.returnmessage
                })
            })
            .catch(function (error) {
                //console.log("err", error)
                return res.status(500).json({
                    message: "Zalo sập!"
                })
            });
    }
      
}