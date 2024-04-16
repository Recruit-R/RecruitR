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
                <span className="text-xl">QR Code for {event?.title}</span>
                <div className="mx-auto mt-4">
                    <canvas id="qrcode" height={500} width={500} ref={canvasRef}></canvas>
                </div>
            </div>
        </div>
    );
}
