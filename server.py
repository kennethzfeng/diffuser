import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World'


if __name__ == '__main__':
    # Read port selected by the cloud for our application
    PORT = int(os.getenv('VCAP_APP_PORT', 8000))
    app.run(host='0.0.0.0', port=PORT)
