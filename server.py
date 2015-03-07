import os

from app import app


if __name__ == '__main__':
    # Read port selected by the cloud for our application
    PORT = int(os.getenv('VCAP_APP_PORT', 8000))

    ENV = os.getenv('ENV')
    if ENV is not None and ENV == "DEV":
        debug = True
    else:
        debug = False

    app.run(host='0.0.0.0', port=PORT, debug=debug)
