'use client'
import { useEffect } from "react";
import QRCode from "qrcode";

// pass like this <QRPage url="https://www.example.com" /> 
// recruit/qrgenerator

interface QRPageProps {
    url: string;
}

export function  QRCodeGen({ url }: QRPageProps) {
    useEffect(() => {
        const generateQRCode = async () => {
            const canvas = document.getElementById("qrcode");
            if (canvas) {
                try {
                    await QRCode.toCanvas(canvas, url);
                } catch (error) {
                    console.error("Failed to generate QR code:", error);
                }
            } else {
                console.error("Canvas element not found.");
            }
        };

        generateQRCode();
    }, [url]);

    return (
        <>   
            <div>
                
                <title>QR Code Generator</title>
                <div style={{  padding: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <b>Recruiter Sign Up</b>
                </div>
                <div style={{ padding: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3>To visit recruiter login scan below code</h3>
                </div>
            
                
           
            <main> 
                <div style = {{ padding: '5vh', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                    <canvas id="qrcode" style={{ width: "20%", height: "100%" }}></canvas>
                </div>
            </main>
            </div>
        </>
    );
}