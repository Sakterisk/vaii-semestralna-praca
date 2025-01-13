import { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";

function AboutMe() {
    const [data, setData] = useState([]); // Initialize as an array

    const getSections = async () => {
        try {
            const response = await axios.get("/api/sections");
            setData(response.data); // Assuming response.data is an array of sections
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSections();
    }, []);

    return (
        <>
            {data.map((section, index) => (
                <Section 
                    key={index} // Use a unique key for each element
                    header={section.header} 
                    content={section.content} 
                />
            ))}
        </>
    );
}

export default AboutMe;