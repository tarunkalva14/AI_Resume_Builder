import Resume from "../models/Resume.js";
import { model } from "../configs/gemini.js";


// controller for enhancing a resume's professionl summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = `You are a resume writing specialist. Enhance this professional summary to 1–3 impactful sentences highlighting top skills, relevant experience, and career objectives. Make it persuasive and optimized for ATS.

Original summary:
${userContent}

Return only the enhanced text, no explanations.`;

        const result = await model.generateContent(prompt);
        const enhancedContent = result.response.text().trim();

        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.error("Enhance Summary Error:", error);
        return res.status(500).json({ message: error.message });
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = `You are a resume writing expert. Improve this job description into 1–2 impactful sentences highlighting key responsibilities and achievements. Use strong action verbs and include measurable results where applicable. Optimize for ATS.

Original description:
${userContent}

Return only the enhanced text, no explanations.`;

        const result = await model.generateContent(prompt);
        const enhancedContent = result.response.text().trim();

        return res.status(200).json({ enhancedContent });

    } catch (error) {
        console.error("Enhance Job Desc Error:", error);
        return res.status(500).json({ message: error.message });
    }
}

// controller for uploading resume to Database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        console.log("\n=== UPLOAD RESUME START ===");
        
        const { resumeText, title } = req.body;
        const userId = req.userId;

        console.log("📥 Request received");
        console.log("   Title:", title);
        console.log("   Text length:", resumeText?.length);
        console.log("   User ID:", userId);

        // Validation
        if (!resumeText || !title) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ 
                message: "Title and resume text are required" 
            });
        }

        if (!userId) {
            console.log("❌ No user ID");
            return res.status(401).json({ 
                message: "Unauthorized" 
            });
        }

        console.log("🤖 Calling Gemini API...");

        const prompt = `Extract all information from this resume and return ONLY valid JSON (no markdown, no explanation).

Resume text:
${resumeText}

Return this exact JSON structure with extracted data:
{
    "professional_summary": "brief professional summary from resume",
    "skills": ["skill1", "skill2", "skill3"],
    "personal_info": {
        "image": "",
        "full_name": "person's full name",
        "profession": "job title/profession",
        "email": "email address",
        "phone": "phone number",
        "location": "city, state/country",
        "linkedin": "linkedin url if found",
        "website": "website url if found"
    },
    "experience": [
        {
            "company": "company name",
            "position": "job title",
            "start_date": "start date",
            "end_date": "end date or Present",
            "description": "job description and achievements",
            "is_current": false
        }
    ],
    "project": [
        {
            "name": "project name",
            "type": "project type",
            "description": "project description"
        }
    ],
    "education": [
        {
            "institution": "school/university name",
            "degree": "degree name",
            "field": "field of study",
            "graduation_date": "graduation date",
            "gpa": "GPA if mentioned"
        }
    ]
}

Return ONLY the JSON object.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Clean markdown formatting
        let cleanedText = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        console.log("📄 Parsing JSON...");

        const parsedData = JSON.parse(cleanedText);

        console.log("✅ JSON parsed successfully");

        // Prepare data with safe defaults
        const resumeData = {
            userId,
            title: title.trim(),
            professional_summary: parsedData.professional_summary || "",
            skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
            personal_info: {
                image: parsedData.personal_info?.image || "",
                full_name: parsedData.personal_info?.full_name || "",
                profession: parsedData.personal_info?.profession || "",
                email: parsedData.personal_info?.email || "",
                phone: parsedData.personal_info?.phone || "",
                location: parsedData.personal_info?.location || "",
                linkedin: parsedData.personal_info?.linkedin || "",
                website: parsedData.personal_info?.website || ""
            },
            experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
            project: Array.isArray(parsedData.project) ? parsedData.project : [],
            education: Array.isArray(parsedData.education) ? parsedData.education : []
        };

        console.log("💾 Creating resume in database...");

        const newResume = await Resume.create(resumeData);

        return res.status(200).json({ 
            resume: newResume
        });

    } catch (error) {
       
        if (error.stack) {
            console.error("Stack:", error.stack.split('\n').slice(0, 3).join('\n'));
        }
        console.error("==============================\n");
        
        let errorMessage = "Failed to process resume";
        
        if (error.message.includes('JSON')) {
            errorMessage = "Could not parse resume data";
        } else if (error.message.includes('API key')) {
            errorMessage = "Invalid API key";
        } else if (error.message.includes('quota')) {
            errorMessage = "API quota exceeded";
        }
        
        return res.status(500).json({ 
            message: errorMessage
        });
    }
}