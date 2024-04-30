'use client'
//test merge
import getData from "@/app/api/getData";
import { Event } from "@/app/types/event";
import { checkEnvironment } from "@/checkEnvironment";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function QRCodeGenerator({ eventId }: { eventId: string }) {


    const [event, setEvent] = useState<Event | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        getData({
            collection_name: 'events',
            document_id: eventId as string,
        }).then((event: Event) => {
            setEvent(event);
            const generateQRCode = async () => {

                const canvas = canvasRef.current;
                if (canvas) {
                    try {
                        const baseUrl = checkEnvironment().BASE_URL ?? process.env.API_URL;
                        QRCode.toCanvas(canvas, baseUrl as string + '/auth/signup/' + eventId);
                    } catch (error) {
                        console.error("Failed to generate QR code:", error);
                    }
                } else {
                    console.error("Canvas element not found.");
                }
            };

            generateQRCode();
        })
    }, []);

    const handlePrintButtonClick = () => {
        const canvas = canvasRef.current;
        if (canvas && canvas.toDataURL()) {
            const url = canvas.toDataURL(); // Convert canvas to image data URL
            const windowContent = '<!DOCTYPE html><html><head><title>Print QR Code</title></head><body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;"><img src="' + url + '" /></body></html>';
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.open();
                printWindow.document.write(windowContent);
                printWindow.document.close();
                printWindow.onload = () => {
                    printWindow.print();
                };

            } else {
                console.error("Failed to open print window.");
            }
        } else {
            console.error("Canvas element not found.");
        }

    };

    const calculateQRCodeSize = () => {
        // Calculate the size based on the screen width
        const screenWidth = window.innerWidth;
        return Math.min(screenWidth * 0.8, 400);
    };

    return (

        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col justify-center items-center h-full">
                <span className="text-xl font-bold">QR Code for {event?.title}</span>
                <div className="mx-auto mt-4">
                    <canvas id="qrcode" height={500} width={500} ref={canvasRef}></canvas>
                </div>
                <div className="mt-4">
                    <Button variant="outline" onClick={handlePrintButtonClick}>
                        Print QR Code
                    </Button>
                </div>


            </div>
        </div>
    );
}
