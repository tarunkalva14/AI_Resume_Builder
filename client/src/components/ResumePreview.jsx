import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate"
import ElegantImageTemplate from "./templates/ElegantImageTemplate"
import MinimalImageTemplate from "./templates/MinimalImageTemplate"
import MinimalTemplate from "./templates/MinimalTemplate"
import SquarePhotoTemplate from "./templates/SquarePhotoTemplate"
import ModernTemplate from "./templates/ModernTemplate";



const ResumePreview = ({data, template, accentColor, removeBackground, classes = ""}) => {
    const renderTemplate = () => {
        switch (template) {
            case "modern":
            return <ModernTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;

            case "minimal":
            return <MinimalTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;

            case "minimal-image":
            return <MinimalImageTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;

            case "elegant-image":
            return <ElegantImageTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;

            case "square-photo":
            return <SquarePhotoTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;

            default:
            return <ClassicTemplate data={data} accentColor={accentColor} removeBackground={removeBackground} />;
        }
    };

    return(
        <div className="w-full bg-gray-100"
        style={{ "---accent_color": accentColor }}>
            <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none "
                + classes}>
                {renderTemplate()}
            </div>
            <style>
                {`
                @page {
                size: letter;
                margin: 0;
                }
                @media print {
                html, body {
                    width: 8.5in;
                    height: 11in;
                    overflow: hidden;
                
                }
                body *{
                    visibility: hidden;
                }
                #resume-preview, #resume-preview *{
                    visibility: visible;
                }
                #resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: auto;
                    margin: 0;
                    padding: 0;
                    box-shadow: none !important;
                    border: none !important;
                }
                }
                
                /* Profile image styling */
                #resume-preview img[alt="Profile"] {
                    object-fit: cover;
                }
                `}
            </style>
        </div>
    )
}

export default ResumePreview
