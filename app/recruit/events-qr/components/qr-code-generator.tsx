'use client'

import getData from "@/app/api/getData";
import { Event } from "@/app/types/event";
import { checkEnvironment } from "@/checkEnvironment";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
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
                        console.log('qr url', baseUrl);
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

    return (
        <div className="flex justify-center h-full">
            <div className="flex flex-col justify-center h-full">
                <span className="text-xl text-center">QR Code for {event?.title}</span>
                <canvas id="qrcode" ref={canvasRef} className='!h-[50vh] !w-[50vh]'></canvas>
            </div>
        </div>
    );
}
