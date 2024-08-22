export const SCRIPT_TEMPLATE = `#!/bin/sh

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

CONFIG_FILE="./beautiful-commits.config.json"

if [ -f "$CONFIG_FILE" ]; then
  EMOJI=$(grep -oP '"selectedEmoji":\\s*"\\K[^"]+' "$CONFIG_FILE")
  if [ -z "$EMOJI" ]; then
    EMOJI="☄️"
  fi
else
  EMOJI="☄️"
fi

if [ "$COMMIT_SOURCE" = "merge" ]; then
  exit 0
fi

if [ ! -f "$COMMIT_MSG_FILE" ]; then
  echo "Error: Commit message file not found."
  exit 1
fi

COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")
echo "$EMOJI $COMMIT_MSG" > "$COMMIT_MSG_FILE"


`;
