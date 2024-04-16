import { QRCodeGenerator } from "../components/qr-code-generator";

function Page({ params }: { params: { eventId: string } }) {

    return (
        <QRCodeGenerator eventId={params.eventId} />
    );
}

export default Page;