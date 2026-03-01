#!/bin/bash
# VPS 배포 스크립트 (root@5.223.60.9)
# Usage: bash deploy/setup-vps.sh

set -e

VPS="root@5.223.60.9"
REMOTE_DIR="/root/awc-webhook"

echo "=== Deploying AWC Webhook to VPS ==="

# 1. Create remote directory
ssh $VPS "mkdir -p $REMOTE_DIR"

# 2. Copy files
scp scripts/telegram-webhook.mjs $VPS:$REMOTE_DIR/
scp package.json $VPS:$REMOTE_DIR/
scp deploy/awc-webhook.service $VPS:/etc/systemd/system/

# 3. Install dependencies on VPS
ssh $VPS "cd $REMOTE_DIR && npm install --omit=dev"

# 4. Create .env if not exists
ssh $VPS "test -f $REMOTE_DIR/.env || echo 'Create .env with required vars' && exit 0"

# 5. Setup systemd
ssh $VPS "systemctl daemon-reload && systemctl enable awc-webhook && systemctl restart awc-webhook"

# 6. Open firewall
ssh $VPS "ufw allow 3847/tcp"

# 7. Set Telegram webhook URL
echo ""
echo "=== Manual step required ==="
echo "Run the following to set Telegram webhook:"
echo "  curl -X POST 'https://api.telegram.org/bot\$BOT_TOKEN/setWebhook' \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"url\": \"http://5.223.60.9:3847/webhook/\$BOT_TOKEN\"}'"
echo ""
echo "Check status:"
echo "  ssh $VPS 'systemctl status awc-webhook'"
echo "  ssh $VPS 'journalctl -u awc-webhook -f'"
echo "  curl http://5.223.60.9:3847/health"
