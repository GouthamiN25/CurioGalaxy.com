from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__, template_folder="templates", static_folder="static")

# --- OpenAI client (reads your OPENAI_API_KEY from the environment) ---
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ---------- PAGES ----------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/tales")
def tales():
    return render_template("tales.html")

@app.route("/collection")
def collection():
    return render_template("collection.html")

@app.route("/guidora")
def guidora():
    return render_template("guidora.html")

@app.route("/start-chat")
def start_chat():
    # uses templates/start-chat.html
    return render_template("start-chat.html")

# ---------- API: CHATBOT ----------

@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.get_json(force=True) or {}
    user_message = (data.get("message") or "").strip()
    history = data.get("history", [])  # [{role:"user"/"assistant", content:"..."}, ...]

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    # Build conversation
    messages = [
        {
            "role": "system",
            "content": (
                "You are CurioGalaxy, a warm, curious AI assistant. "
                "Be friendly, concise, and helpful. If the user is stuck, "
                "suggest practical next steps."
            ),
        }
    ]

    for turn in history:
        if "role" in turn and "content" in turn:
            messages.append({"role": turn["role"], "content": turn["content"]})

    messages.append({"role": "user", "content": user_message})

    completion = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=messages,
        temperature=0.7,
    )

    reply_text = completion.choices[0].message.content
    return jsonify({"reply": reply_text})


if __name__ == "__main__":
    # run on the same port you’ve been using
    app.run(host="0.0.0.0", port=5050, debug=True)
