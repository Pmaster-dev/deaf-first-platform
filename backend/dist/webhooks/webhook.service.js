import crypto from 'crypto';
/**
 * In-memory storage for webhooks (in production, use a database)
 */
class WebhookService {
    webhooks = new Map();
    deliveries = new Map();
    /**
     * Register a new webhook
     */
    registerWebhook(name, url, events, secret) {
        const id = this.generateId();
        const generatedSecret = secret || this.generateSecret();
        const webhook = {
            id,
            name,
            url,
            events,
            secret: generatedSecret,
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.webhooks.set(id, webhook);
        return webhook;
    }
    /**
     * Get all registered webhooks
     */
    getAllWebhooks() {
        return Array.from(this.webhooks.values());
    }
    /**
     * Get a specific webhook by ID
     */
    getWebhook(id) {
        return this.webhooks.get(id);
    }
    /**
     * Update a webhook
     */
    updateWebhook(id, updates) {
        const webhook = this.webhooks.get(id);
        if (!webhook)
            return null;
        const updated = {
            ...webhook,
            ...updates,
            id: webhook.id, // Prevent ID change
            updatedAt: new Date().toISOString(),
        };
        this.webhooks.set(id, updated);
        return updated;
    }
    /**
     * Delete a webhook
     */
    deleteWebhook(id) {
        return this.webhooks.delete(id);
    }
    /**
     * Trigger webhook event
     */
    async triggerEvent(eventType, data) {
        const webhooks = Array.from(this.webhooks.values()).filter((webhook) => webhook.active && webhook.events.includes(eventType));
        const deliveryPromises = webhooks.map((webhook) => this.deliverWebhook(webhook, eventType, data));
        await Promise.allSettled(deliveryPromises);
    }
    /**
     * Deliver webhook to endpoint
     */
    async deliverWebhook(webhook, eventType, data) {
        const deliveryId = this.generateId();
        const payload = {
            event: eventType,
            timestamp: new Date().toISOString(),
            data,
        };
        const signature = this.generateSignature(JSON.stringify(payload), webhook.secret);
        const delivery = {
            id: deliveryId,
            webhookId: webhook.id,
            event: eventType,
            payload,
            attempts: 1,
            status: 'pending',
            timestamp: new Date().toISOString(),
        };
        this.deliveries.set(deliveryId, delivery);
        try {
            const response = await fetch(webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Signature': signature,
                    'X-Webhook-Event': eventType,
                    'X-Webhook-Delivery': deliveryId,
                },
                body: JSON.stringify(payload),
            });
            delivery.response = {
                status: response.status,
                body: await response.text(),
            };
            delivery.status = response.ok ? 'success' : 'failed';
        }
        catch (error) {
            delivery.status = 'failed';
            delivery.response = {
                status: 0,
                body: error instanceof Error ? error.message : 'Unknown error',
            };
        }
        this.deliveries.set(deliveryId, delivery);
    }
    /**
     * Get delivery history for a webhook
     */
    getDeliveries(webhookId) {
        const deliveries = Array.from(this.deliveries.values());
        if (webhookId) {
            return deliveries.filter((d) => d.webhookId === webhookId);
        }
        return deliveries;
    }
    /**
     * Verify webhook signature
     */
    verifySignature(payload, signature, secret) {
        const expectedSignature = this.generateSignature(payload, secret);
        // Normalize signatures to ensure they're in the same format (hex)
        const normalizedSignature = signature.toLowerCase().trim();
        const normalizedExpected = expectedSignature.toLowerCase().trim();
        const hexPattern = /^[0-9a-f]+$/;
        if (!hexPattern.test(normalizedSignature) || !hexPattern.test(normalizedExpected)) {
            return false;
        }
        // Ensure both signatures have the same length before comparison
        if (normalizedSignature.length !== normalizedExpected.length) {
            return false;
        }
        const signatureBuffer = Buffer.from(normalizedSignature, 'hex');
        const expectedBuffer = Buffer.from(normalizedExpected, 'hex');
        if (signatureBuffer.length !== expectedBuffer.length) {
            return false;
        }
        return crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
    }
    /**
     * Generate HMAC signature
     */
    generateSignature(payload, secret) {
        return crypto.createHmac('sha256', secret).update(payload).digest('hex');
    }
    /**
     * Generate unique ID
     */
    generateId() {
        return `wh_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }
    /**
     * Generate webhook secret
     */
    generateSecret() {
        return crypto.randomBytes(32).toString('hex');
    }
}
// Export singleton instance
export const webhookService = new WebhookService();
//# sourceMappingURL=webhook.service.js.map