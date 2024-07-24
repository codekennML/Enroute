type MessageHandler = (message: any) => void;

const WEBSOCKET_URL = process.env.WEBSOCKET_SERVER_URL ?? "127.0.0.1:9001/ws/";
class WebSocketService {

    private static instance: WebSocketService;
    private ws: WebSocket | null = null;
    private token: string | null = null;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 15;
    private reconnectInterval: number = 2000; // 2 seconds
    private messageHandler: MessageHandler | null = null;

    private constructor() { }

    static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    private connect(): void {
        if (this.ws) {
            this.ws.close();
        }

        if (!this.token) {
            console.error("Token is required to establish a WebSocket connection.");
            return;
        }

        this.ws = new WebSocket(`wss://example.com?token=${this.token}`);

        this.ws.onopen = () => {
            console.log('WebSocket connection established');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (this.messageHandler) {
                this.messageHandler(message);
            }
        };

        this.ws.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log(`WebSocket connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('WebSocket connection died');
            }

            this.reconnect();
        };

        this.ws.onerror = (error: Event) => {
            console.error(`WebSocket error: ${error}`);
            this.ws?.close();
        };
    }

    updateToken(token: string): void {
        this.token = token;
        this.connect();
    }

    isOpen(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }

    setMessageHandler(handler: MessageHandler | null): void {
        this.messageHandler = handler;
    }

    private reconnect(): void {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts += 1;
            setTimeout(() => {
                console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
                this.connect();
            }, this.reconnectInterval);
        } else {
            console.error('Max reconnect attempts reached');
        }
    }

    send(message: any): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        }
    }

    destroy(): void {
        if (this.ws) {
            this.ws.close();
        }
        this.ws = null;
        this.messageHandler = null;
        this.reconnectAttempts = 0;
    }
}

export default WebSocketService;
