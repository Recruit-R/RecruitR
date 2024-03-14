
'use client'

import React from "react";
import { QRCodeGen } from "./components/qr-code";

function App() {
    const url = "https://recruitr-dun.vercel.app/";

    return <QRCodeGen url={url} />;
}

export default App;