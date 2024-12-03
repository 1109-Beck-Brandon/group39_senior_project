<<<<<<< HEAD
from backend import create_app, db
from flask_cors import CORS

app = create_app()
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5000"}})

if __name__ == '__main__':
=======
from backend import create_app, db
from flask_cors import CORS

app = create_app()
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})

if __name__ == '__main__':
>>>>>>> main
    app.run(debug=True)