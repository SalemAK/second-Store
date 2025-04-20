import React from "react";
import socialLinks from "../../data/ourData/socialLinks.json";
import * as FaIcons from "react-icons/fa";

const SocialMediaLinks = () => {
    return (
        <div className="contact-social text-center" dir="ltr">
            <h3>Follow Us</h3>
            <ul className="d-flex flex-column align-items-start">
                {socialLinks
                    .filter((link) => link.show)
                    .map((link, index) => {
                        const IconComponent = FaIcons[link.icon];
                        return (
                            <li key={index} className="d-flex align-items-center mb-2">
                                {IconComponent && <IconComponent className="me-2" />}
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.name}
                                </a>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default SocialMediaLinks;
