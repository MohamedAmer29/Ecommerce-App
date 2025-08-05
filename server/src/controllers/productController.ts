import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../module/productDb";
// add product
export async function addProduct(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = (req.files as any).image1 && (req.files as any).image1[0];
    const image2 = (req.files as any).image2 && (req.files as any).image2[0];
    const image3 = (req.files as any).image3 && (req.files as any).image3[0];
    const image4 = (req.files as any).image4 && (req.files as any).image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new Product(productData);
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

// list product
export async function listProduct(req: Request, res: Response) {
  try {
    const products = await Product.find({});

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

// remove product
export async function removeProduct(req: Request, res: Response) {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(204).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}

// single product
export async function productInfo(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.body.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
