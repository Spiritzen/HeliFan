#!/bin/bash
# deploy.sh — Build et deploiement sur VPS
# Usage : bash deploy.sh
# Prerequis : rsync et acces SSH configure sur le VPS

VPS_USER="ton_user"
VPS_IP="TON_IP_VPS"
VPS_PATH="/var/www/helicard"

echo "Build en cours..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build echoue. Deploiement annule."
  exit 1
fi

echo "Deploiement sur $VPS_IP..."
rsync -avz --delete dist/ $VPS_USER@$VPS_IP:$VPS_PATH/

echo "Deploiement termine !"
echo "https://TON_DOMAINE.com"
