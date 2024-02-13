import { getSelf } from "@/lib/auth-service";
import { getStreameByUserId } from "@/lib/stream-service";
import { UrlCard } from "./_components/urls-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

const KeysPage = async () => {
    const self = await getSelf();
    const stream = await getStreameByUserId(self.id);

    if (!stream) {
        throw new Error('Stream not found');
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.streamKey} /> 
            </div>
        </div>
    )
}

export default KeysPage;