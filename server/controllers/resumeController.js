import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import sharp from 'sharp';

// controller for creating a new resumes
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {title} = req.body;
        const newResume = await Resume.create({userId, title})
        return res.status(201).json({message: 'Resume Created Successfully', resume: newResume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for deleting Resume
// DELETE: /api/users/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;
        await Resume.findOneAndDelete({userId, _id: resumeId})
        return res.status(200).json({message: 'Resume Deleted Successfully'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// get user resume by _id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;
        const resume = await Resume.findOne({userId, _id: resumeId})
        
        if(!resume){
            return res.status(404).json({message: 'No Resume found'})
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// get resume by id (Public)
//GET : /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const {resumeId} = req.params;
        const resume = await Resume.findOne({public: true, _id: resumeId})
        
        if(!resume){
            return res.status(404).json({message: 'No Resume found'})
        }
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for updating resume 
// PUT: /api/resumes/update 
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData)
        }else{
            resumeDataCopy = structuredClone(resumeData)
        }

        if(image){
            console.log("📸 BACKEND: Image detected!");

            try {
                let imageBuffer = image.buffer;
                
                // If remove background is ON, add colored background
                if (removeBackground === 'yes') {
                    console.log("🎨 Adding colored background...");
                    
                    // Get the accent color
                    const accentColor = resumeDataCopy.accent_color || '#6366F1';
                    console.log("BACKEND: Color:", accentColor);
                    
                    // Use Sharp to add colored background
                    imageBuffer = await sharp(image.buffer)
                        .resize(300, 300, { fit: 'cover' })
                        .flatten({ background: accentColor })
                        .png()
                        .toBuffer();
                    
                    console.log("✅ Background color applied!");
                }

                // Upload to ImageKit
                console.log("☁️ Uploading to ImageKit...");
                const response = await imagekit.upload({
                    file: imageBuffer.toString('base64'), 
                    fileName: `resume_${Date.now()}_${image.originalname}`,
                    folder: '/user-resumes'
                });
            
                console.log("✅ Uploaded to ImageKit!");
                console.log("BACKEND: Image URL:", response.url);
                
                resumeDataCopy.personal_info.image = response.url;
                                
            } catch (imageError) {
                console.error("❌ Error:", imageError);
                return res.status(500).json({ 
                    message: "Image upload failed", 
                    error: imageError.message 
                });
            }
        } else {
            console.log("ℹ️ BACKEND: No image file in request");
        }

        // Update resume in database
        const resume = await Resume.findOneAndUpdate(
            {userId, _id: resumeId}, 
            resumeDataCopy,
            {new: true}
        );

        if(!resume) {
            console.log("❌ BACKEND: Resume not found");
            return res.status(404).json({message: "Resume not found"});
        }
        
        return res.status(200).json({
            message: "Successfully Saved", 
            resume: resume
        });

    } catch (error) {
        console.error("❌ BACKEND ERROR:", error);
        return res.status(400).json({message: error.message});
    }
}