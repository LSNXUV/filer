#!/bin/bash
set -e

cd "$(dirname "$0")"

# 带超时的 git pull 重试机制
MAX_RETRIES=5
RETRY_DELAY=2

for ((i=1; i<=MAX_RETRIES; i++)); do
    echo "第 $i 次尝试拉取代码..."
    if timeout 30 git pull --rebase --autostash origin master; then
        echo "✅ git pull 成功"
        break
    else
        echo "⚠️ 第 $i 次尝试失败"
        if [ $i -lt $MAX_RETRIES ]; then
            echo "⏳ 等待 $RETRY_DELAY 秒后重试..."
            sleep $RETRY_DELAY
        else
            echo "❌ 已重试 $MAX_RETRIES 次仍失败，终止脚本"
            exit 1
        fi
    fi
done

echo "安装依赖..."
pnpm install
echo "✅ 依赖安装完成"

echo "构建项目..."
pnpm build
echo "✅ 构建完成"

if [ ! -d "dev" ]; then
    echo "创建dev目录..."
    mkdir dev
    echo "✅ dev目录创建成功"
fi

echo "将输出out文件复制到dev目录..."
shopt -s extglob
cp -r out/!(.user.ini) dev/

echo "✅ 部署脚本成功完成。"
