/**
 * Webhook Types for DEAF-FIRST Platform
 * These types define the structure for webhook events and configurations
 */
// Available webhook event types
export var WebhookEventType;
(function (WebhookEventType) {
    WebhookEventType["USER_CREATED"] = "user.created";
    WebhookEventType["USER_UPDATED"] = "user.updated";
    WebhookEventType["USER_DELETED"] = "user.deleted";
    WebhookEventType["AUTH_LOGIN"] = "auth.login";
    WebhookEventType["AUTH_LOGOUT"] = "auth.logout";
    WebhookEventType["DOCUMENT_UPLOADED"] = "document.uploaded";
    WebhookEventType["DOCUMENT_PROCESSED"] = "document.processed";
    WebhookEventType["ACCESSIBILITY_REQUEST"] = "accessibility.request";
    WebhookEventType["SYNC_STARTED"] = "sync.started";
    WebhookEventType["SYNC_COMPLETED"] = "sync.completed";
    WebhookEventType["AI_PROCESS_STARTED"] = "ai.process.started";
    WebhookEventType["AI_PROCESS_COMPLETED"] = "ai.process.completed";
})(WebhookEventType || (WebhookEventType = {}));
//# sourceMappingURL=webhook.types.js.map