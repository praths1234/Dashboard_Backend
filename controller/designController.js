import userModel from "../model/userModel.js";
import Product from "../model/Product.js";
import Design from "../model/Design.js";
import upload from "../utils/upload.js";
import path from "path";
import fs from 'fs';
import * as htmlToImage from 'html-to-image';
export const createDesign = [
    upload.single('image'),
    async (req, res) => {
      try {
        const { userId, productId, text, color, size, textPosition, imagePosition, customizedImage , price } = req.body;
  
        let imageUrl = null;
        if (req.file) {
          imageUrl = `/uploads/${req.file.filename}`;
        }
  
        let parsedTextPosition = typeof textPosition === 'string' ? JSON.parse(textPosition) : textPosition;
        let parsedImagePosition = typeof imagePosition === 'string' ? JSON.parse(imagePosition) : imagePosition;
  
        const newDesign = new Design({
          userId,
          productId,
          text,
          color,
          size,
          image: imageUrl,
          textPosition: parsedTextPosition,
          imagePosition: parsedImagePosition,
          customizedImage,
          price
             });
  
        await newDesign.save();
        res.status(201).send(newDesign);
      } catch (error) {
        console.error('Error creating design:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  ];
  
  export const getAllDesigns = async (req, res) => {
    try {
      const designs = await Design.find();
      res.send(designs);
    } catch (error) {
      console.error('Error fetching designs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const getDesignByUserId = async (req , res) => {
    try{
      const {userId} = req.params ;
      const design= await Design.find({userId});
      //console.log(`Fetching designs for userId: ${userId}`);
      if(!design){
        return res.status(404).json({message: 'You have no products'});
      }
      res.send(design);
    } catch(error){
      console.error('Error fetching design:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export const getDesignById = async (req, res) => {
    try {
      const { designId } = req.params;
      const design = await Design.findById(designId);
      if (!design) {
        return res.status(404).json({ message: 'Design not found' });
      }
      res.send(design);
    } catch (error) {
      console.error('Error fetching design:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const deleteDesignById = async (req , res) => {
   // const designId = req.params;
    const { designId } = req.params;
      try {
          const deletedDesign = await Design.findByIdAndDelete(designId);
          if (!deletedDesign) {
              return res.status(404).json({ message: 'Design not found' });
          }
          res.json({ message: 'Design deleted successfully' });
      } catch (error) {
          res.status(500).json({ message: 'Error deleting design', error });
      }
  };
