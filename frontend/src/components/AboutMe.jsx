import { useEffect } from "react";
import React, { useState } from "react";
import Section from "./Section";

function AboutMe() {
    
    const [data, setData] = useState([]);

    const sectionsData = () => {
        fetch('http://localhost:8000/api/sections')
        .then(response => response.json())
        .then(data => {
            setData(data);
        });
    }

    useEffect(() => {
        sectionsData();
    }, []);


    const headers = data.map(section => section.header);
    const contents = data.map(section => section.content);
    
    /*const headers = ["Adam Adamec", "About Me", "My Skills", "Looking For"];
    const contents = [
            "I am a game developer with a passion for creating games that are <b>fun</b> and <b>engaging</b>. I have been developing games for over <b>10 years</b> and have worked on a variety of projects ranging from <b>mobile games</b> to <b>AAA titles</b>. I am proficient in a variety of <b>programming languages</b> and <b>game engines</b>, including <b>Unity</b> and <b>Unreal Engine</b>. I am always looking for new opportunities to <b>collaborate</b> with other developers and <b>create amazing games</b>.",
            "I am a game developer with a passion for creating games that are <b>fun</b> and <b>engaging</b>. Over the past <b>10 years</b>, I have worked on a variety of projects, from <b>mobile games</b> to <b>AAA titles</b>. My expertise spans several <b>programming languages</b> and <b>game engines</b>, such as <b>Unity</b> and <b>Unreal Engine</b>. I am constantly seeking <b>new opportunities</b> to collaborate with talented developers and <b>bring unique game ideas to life</b>.",
            "I have honed a diverse range of skills that make me an effective and versatile game developer. I am proficient in multiple <b>programming languages</b>, including <b>C#</b>, <b>C++</b>, <b>Java</b>, and <b>Python</b>, which provide me with the flexibility to work on a wide variety of projects and adapt to different development environments. I also have extensive experience working with leading <b>game engines</b> such as <b>Unity</b> and <b>Unreal Engine</b>, enabling me to create immersive and high-performance games. Additionally, I am skilled in using <b>Godot</b> and <b>GameMaker Studio</b>, further expanding my ability to develop games of varying scales and complexities. Beyond programming, I possess a range of complementary skills that contribute to the game development process, including <b>3D modeling</b>, <b>animation</b>, <b>level design</b>, and <b>sound design</b>. These abilities allow me to contribute to both the technical and creative aspects of game creation, ensuring a cohesive and engaging final product. Together, these skills empower me to tackle challenging game development projects, from conceptualization to the final polished release.",
            "I am currently looking for <b>new opportunities</b> to collaborate with other developers and <b>create amazing games</b>. I am open to working on a variety of projects, including <b>mobile games</b>, <b>PC games</b>, and <b>VR games</b>. I am also interested in exploring projects that <b>push the boundaries</b> of what is possible in game development and embrace <b>innovative ideas</b>. If you are interested in working with me, please feel free to <b>contact me</b>."
    ];*/
    return (
        <>
            {headers.map((header, index) => (
                <Section key={index} header={header} content={contents[index]} />
            ))}
        </>
    );
}

export default AboutMe;