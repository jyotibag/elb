import { StatusCodes } from "http-status-codes";
import pool from "../../db.js";
import slug from "slug";
import dayjs from "dayjs";
import { paginationLogic } from "../../utils/functions.js";

export const addBrand = async (req, res) =>{
    const {parentId, brand} = req.body;
    const brandSlug = slug(brand);
    const timeStamp = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const data = await pool.query(`insert into master_brands (brand, slug, cat_id, created_at)
    values ($1, $2, $3, $4)`,[brand.trim(),brandSlug,parentId,timeStamp]);
    res.status(StatusCodes.CREATED).json({data:`Success`});
};
export const getBrands = async(req, res) =>{
    //const {page, search, parent} = req.query;
    //const pagination = paginationLogic(page, null);
    const data = await pool.query(`select * from master_brands where is_active=true`,[]);
    res.status(StatusCodes.OK).json({data});
};