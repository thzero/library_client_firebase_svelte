#!/bin/bash

if [ -z "$1" ]; then
    echo "Commit message is empty"
    exit 1
fi

git add .
git commit -m "$1"
git push