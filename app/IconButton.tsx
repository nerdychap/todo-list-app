import React from "react";

interface IconButtonProps {
    icon: React.ReactNode; 
    onClick: () => void; 
    style?: React.CSSProperties; 
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, style }) => {
    const defaultStyle: React.CSSProperties = {
        padding: "8px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        transition: "color 0.3s ease",
    };

    return (
        <button onClick={onClick} style={{ ...defaultStyle, ...style }}>
            {icon}
        </button>
    );
};

export default IconButton;