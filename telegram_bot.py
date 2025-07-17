import os
import logging
import requests
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Load the bot token securely
BOT_TOKEN = os.getenv("BOT_TOKEN")

# Set up logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# /start or /status command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("👋 Welcome to Gnosis VaultBot 🔐\nUse /deploy to push to Vercel.\nMore coming soon...")

# /deploy command (Vercel trigger)
async def deploy(update: Update, context: ContextTypes.DEFAULT_TYPE):
    webhook_url = os.getenv("VERCEL_WEBHOOK_URL")
    
    if not webhook_url:
        await update.message.reply_text("❌ Webhook URL not configured")
        return
    
    try:
        response = requests.post(webhook_url)
        if response.status_code == 200:
            await update.message.reply_text("✅ Deployment triggered on Vercel!")
        else:
            await update.message.reply_text(f"⚠️ Deployment failed: {response.status_code}")
    except Exception as e:
        await update.message.reply_text(f"❌ Error: {str(e)}")

# Build the app
def run_bot():
    if not BOT_TOKEN:
        print("❌ BOT_TOKEN environment variable not set")
        return
    
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("status", start))
    app.add_handler(CommandHandler("deploy", deploy))
    
    print("🤖 VaultBot is alive...")
    app.run_polling()

if __name__ == "__main__":
    run_bot()