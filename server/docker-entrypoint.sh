#!/bin/sh
set -e

KEY_DIR=/keys
KEYPAIR=$KEY_DIR/keypair.pem
PRIVATE_KEY=$KEY_DIR/private.pem
PUBLIC_KEY=$KEY_DIR/public.pem

mkdir -p $KEY_DIR

if [ ! -f "$PRIVATE_KEY" ]; then
  echo "Generating JWT keypair..."

  openssl genrsa -out $KEYPAIR 2048

  openssl rsa -in $KEYPAIR -pubout -out $PUBLIC_KEY

  openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in $KEYPAIR -out $PRIVATE_KEY

  chmod 600 $PRIVATE_KEY
  chmod 644 $PUBLIC_KEY

  chmod +x $PRIVATE_KEY
  chmod +x $PUBLIC_KEY
fi

exec "$@"
