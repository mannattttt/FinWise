import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
apiKey = os.getenv("API_KEY")

MODEL_NAME = "gemini-1.5-flash"

# Configure Gemini AI
genai.configure(api_key=apiKey)

try:
    model = genai.GenerativeModel(MODEL_NAME)
except Exception as e:
    print(f"Error initializing model: {e}")
    exit(1)

# Finance and Banking Specific Prompt Engineering
FINANCE_CONTEXT = """
You are an expert AI assistant specializing in finance and banking sector insights. 
Your responses should be:
- Precise and professional
- Focused on financial topics
- Providing clear, actionable information
- Covering areas such as:
  * Banking products and services
  * Bank Schemes for students , women and elderly people
  * Investment strategies
  * Financial market analysis
  * Banking regulations
  * Personal and corporate finance
  * Economic trends
  * Risk management

If a query is not related to finance or banking, politely redirect the user to seek information from appropriate sources.
"""

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat requests specifically for finance and banking sector.
    Expects a JSON payload with a 'message' key.
    Returns a JSON response with the model's text response.
    """
    try:
        # Get the message from the request
        data = request.get_json()
        user_message = data.get('message', '')

        # Validate input
        if not user_message:
            return jsonify({
                'error': 'No message provided',
                'status': 400
            }), 400

        # Combine context with user message for finance-specific responses
        full_prompt = f"{FINANCE_CONTEXT}\n\nUser Query: {user_message}"

        # Generate response from Gemini
        response = model.generate_content(full_prompt)

        # Return the response
        return jsonify({
            'message': response.text,
            'status': 200
        })

    except Exception as e:
        # Log the error (in a production setting, use proper logging)
        print(f"Error processing chat request: {e}")
        return jsonify({
            'error': 'Internal server error',
            'details': str(e),
            'status': 500
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint to verify the server is running.
    """
    return jsonify({
        'status': 'healthy',
        'model': MODEL_NAME,
        'focus': 'Finance and Banking Sector',
        'message': 'Finance Chatbot Server is running!'
    }), 200

if __name__ == '__main__':
    # Run the Flask app
    app.run(
        host='0.0.0.0',  # Listen on all available network interfaces
        port=5000,       # Standard Flask development port
        debug=True       # Enable debug mode for development
    )