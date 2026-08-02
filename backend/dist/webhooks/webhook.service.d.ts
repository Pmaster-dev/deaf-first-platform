import { WebhookConfig, WebhookDelivery } from '../types/webhook.types';
/**
 * In-memory storage for webhooks (in production, use a database)
 */
declare class WebhookService {
    private webhooks;
    private deliveries;
    /**
     * Register a new webhook
     */
    registerWebhook(name: string, url: string, events: string[], secret?: string): WebhookConfig;
    /**
     * Get all registered webhooks
     */
    getAllWebhooks(): WebhookConfig[];
    /**
     * Get a specific webhook by ID
     */
    getWebhook(id: string): WebhookConfig | undefined;
    /**
     * Update a webhook
     */
    updateWebhook(id: string, updates: Partial<WebhookConfig>): WebhookConfig | null;
    /**
     * Delete a webhook
     */
    deleteWebhook(id: string): boolean;
    /**
     * Trigger webhook event
     */
    triggerEvent(eventType: string, data: any): Promise<void>;
    /**
     * Deliver webhook to endpoint
     */
    private deliverWebhook;
    /**
     * Get delivery history for a webhook
     */
    getDeliveries(webhookId?: string): WebhookDelivery[];
    /**
     * Verify webhook signature
     */
    verifySignature(payload: string, signature: string, secret: string): boolean;
    /**
     * Generate HMAC signature
     */
    private generateSignature;
    /**
     * Generate unique ID
     */
    private generateId;
    /**
     * Generate webhook secret
     */
    private generateSecret;
}
export declare const webhookService: WebhookService;
export {};
//# sourceMappingURL=webhook.service.d.ts.map