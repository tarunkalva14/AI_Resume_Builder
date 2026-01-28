import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({selectedTemplate, onChange}) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
        {
            id:"classic",
            name: "Classic",
            preview: "Timeless, ATS-friendly layout with clearly defined sections, traditional typography, and a professional, no-frills look."
        },
        {
            id:"modern",
            name:"Modern",
            preview: "Contemporary layout featuring subtle color accents, clean spacing, and modern fonts for a bold yet professional feel."
        },
        {
            id:"minimal-image",
            name:"Minimal Image",
            preview: "Clean, minimal design with a single profile image, balanced whitespace, and elegant typography to keep the focus on your story."
        },
        {
            id:"minimal",
            name:"Minimal",
            preview: "Ultra-clean, distraction-free layout with strong hierarchy and crisp typography—perfect for content-first resumes."
        },
        {
            id:"elegant-image",
            name:"Elegant Image",
            preview: "Sophisticated design with refined fonts, soft color tones, and a stylish image layout for a polished, premium look."
        },
        {
            id:"square-photo",
            name:"Square Photo",
            preview: "Structured layout with a bold square photo frame, clean sections, and modern fonts for a confident, professional appearance."
        }

    ]

    return (
        <div className="relative">
            <button onClick={()=> setIsOpen(!isOpen)} className="flex items-center gap-1
            text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300
            hover:ring transition-all px-3 py-2 rounded-lg">
                <Layout size={14}/>
                <span className="max-sm:hidden">Template</span>
            </button>
            {isOpen && (
                <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white
                rounded-md border border-gray-200 shadow-sm">
                    {templates.map((template)=> (
                        <div key={template.id} onClick={()=> {onChange(template.id); 
                        setIsOpen(false)}} className={`relative p-3 border rounded-md
                        cursor-pointer transition-all ${selectedTemplate === template.id ?
                            "border-blue-400 bg-blue-100"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                        }`}>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2">
                                    <div className="size-5 bg-blue-400 rounded-full flex
                                    items-center justify-center">
                                        <Check className="w-3 h-3 text-white"/>
                                    </div>

                                </div>
                            )}
                            <div className="space-y-1">
                                <h4 className="font-medium text-gray-800">{template.name}</h4>
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs 
                                text-gray-500 italic">{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default TemplateSelector;