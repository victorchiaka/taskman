from dotenv import load_dotenv
import os
from backend import initapp

load_dotenv()

IS_DEVELOPMENT = os.getenv("IS_DEVELOPMENT")

app = initapp()

if __name__ == "__main__":
    if not IS_DEVELOPMENT:
        app.run(debug=False)
    else:
        app.run(debug=True)