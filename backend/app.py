# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from secrets import token_urlsafe
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set up Firebase
#cred = credentials.Certificate("secrets/skill-place-market-swap-firebase-adminsdk-o8cig-bfac76d39e.json")

cred = credentials.Certificate("/Users/jasonrobinson/Downloads/skill-place-market-swap-firebase-adminsdk-o8cig-bfac76d39e.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Machine Learning model for skill matching
def skill_matching(user_skills, other_users):
    vectorizer = TfidfVectorizer()
    skills_matrix = vectorizer.fit_transform(user_skills + other_users)
    similarity_scores = cosine_similarity(skills_matrix[0:1], skills_matrix[1:]).flatten()

    return similarity_scores

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_ref = db.collection('users').document()
    user_ref.set(data)
    return jsonify({'status': 'success'})

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    user_skills = data.get('skills', [])
    
    # Fetch all users
    users = []
    user_skills_list = []
    for doc in db.collection('users').stream():
        user_data = doc.to_dict()
        user_skills_list.append(user_data['skills'])
        users.append(user_data)

    # Find skill matches
    matching_scores = skill_matching(user_skills, user_skills_list)
    
    # Sort users based on matching scores
    sorted_users = sorted(zip(users, matching_scores), key=lambda x: x[1], reverse=True)
    sorted_users = [user for user, score in sorted_users]
    
    return jsonify(sorted_users)

if __name__ == '__main__':
    app.run()