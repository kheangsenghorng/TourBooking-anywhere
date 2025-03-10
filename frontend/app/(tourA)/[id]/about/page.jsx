"use client"
import { useRouter, useParams } from "next/navigation";

const About = () => {
  const { id } = useParams(); 
  
  return (
    <div>
      <h1>About {id}</h1>
    </div>
  );
};

export default About;
