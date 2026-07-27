#!/bin/bash
# deploy_android.sh
# Injects the ALU-compiled Aegis Android Library (.so) into the JVM

echo -e "\e[36m[Aegis Deploy] Initiating Android JNI Sandbox Injection...\e[0m"

SO_FILE="android_bridge.so"
PACKAGE_NAME="com.aegis.antivirus"
TARGET_DIR="/data/data/$PACKAGE_NAME/lib"

if [ ! -f "$SO_FILE" ]; then
    echo -e "\e[31m[!] Error: $SO_FILE not found! Run the ALU compiler first.\e[0m"
    exit 1
fi

echo "[Aegis Deploy] Waiting for adb device..."
adb wait-for-device

echo "[Aegis Deploy] Pushing $SO_FILE to $PACKAGE_NAME sandbox..."
# Push to temp then move to ensure permissions
adb push "$SO_FILE" /data/local/tmp/
adb shell "su -c 'cp /data/local/tmp/$SO_FILE $TARGET_DIR/'"
adb shell "su -c 'chmod 755 $TARGET_DIR/$SO_FILE'"

echo -e "\e[32m[Aegis Deploy] SUCCESS: Aegis JNI Bridge is now active in the Android JVM.\e[0m"
